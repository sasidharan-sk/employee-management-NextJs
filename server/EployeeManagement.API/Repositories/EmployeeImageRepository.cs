using Dapper;
using EployeeManagement.API.Controllers;
using EployeeManagement.API.CustomExceptions;
using EployeeManagement.API.Models.Domain;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace EployeeManagement.API.Repositories
{
    public class EmployeeImageRepository : IEmployeeImageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private IDbConnection dbConnection() => new SqlConnection(_connectionString);

        public EmployeeImageRepository(IWebHostEnvironment webHostEnvironment, 
            IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("EmployeesConnectionString");
        }


        public async Task<EmployeeImage> UploadAsync(EmployeeImage image)
        {
            try
            {
                var isValidEmpId = await IsEmployeeIdValidAsync(image.EmpId);
                if (!isValidEmpId)
                {
                    throw new ValidationException("The provided employee ID is invalid.");
                }

                var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "Images",
                    $"{image.FileName}{image.FileExtension}");

                //Upload image to local path
                using var stream = new FileStream(localFilePath, FileMode.Create);
                await image.File.CopyToAsync(stream);

                // https://localhost:portnumber/images/image.jpg
                var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/Images/{image.FileName}{image.FileExtension}";

                image.FilePath = urlFilePath;


                using (var connection = dbConnection())
                {
                    var existingImage = await connection.QueryFirstOrDefaultAsync<EmployeeImage>(
                    "SELECT * FROM EmployeeImages WHERE EmpId = @EmpId",
                    new { EmpId = image.EmpId }
                    );

                    if( existingImage != null )
                    {
                        image.Id = existingImage.Id;
                    }
                    else
                    {
                        Guid imageId = Guid.NewGuid();
                        image.Id = imageId;
                    }

                    var updateQuery = "UPDATE EmployeeImages SET Id = @Id, FileName = @FileName, FileDescription = " +
                        "@FileDescription, FileSizeInBytes = @FileSizeInBytes, FilePath = @FilePath" +
                        " WHERE EmpId = @EmpId";

                    var insertQuery = "INSERT INTO EmployeeImages (Id, FileName, FileDescription, FileSizeInBytes, FilePath, EmpId)" +
                        "VALUES (@Id, @FileName, @FileDescription, @FileSizeInBytes, @FilePath, @EmpId)";

                    var rowsAffected = await connection.ExecuteAsync(existingImage != null ? 
                        updateQuery : insertQuery, image);

                    return image;
                }
            }
            catch (IdValidationException)
            {
                throw;
            }
        }

        public async Task<bool> IsEmployeeIdValidAsync(Guid EmpId)
        {
            using (var connection = dbConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<int>(
                    "SELECT COUNT(1) FROM Employees WHERE EmpId = @EmpId",
                    new { EmpId = EmpId }
                );
                return result > 0;
            }
        }

        public async Task<EmployeeImage> DeleteAsync(Guid id)
        {
            try
            {
                using (var connection = dbConnection())
                {
                    var targetId = await connection.QueryFirstOrDefaultAsync<EmployeeImage>(
                        "SELECT * FROM EmployeeImages WHERE Id = @Id",
                        new { Id = id }
                    );

                    if (targetId == null)
                    {
                        throw new ValidationException("The provided image ID is invalid");
                    }

                    var deleteImage = await connection.ExecuteAsync(
                    "DELETE FROM EmployeeImages WHERE Id = @Id",
                    new { Id = id }
                    );

                    return targetId;
                }
            }
            catch(IdValidationException)
            {
                throw;
            }
        }
    }
}

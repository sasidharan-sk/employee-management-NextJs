using Dapper;
using EployeeManagement.API.CustomExceptions;
using EployeeManagement.API.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace EployeeManagement.API.Repositories
{
    public class UserAuthRepository : IUserAuthRepository
    {
        private readonly IConfiguration _configuration;

        private readonly string _connectionString;

        private IPasswordHasher<User> _passwordHasher;

        private const string StoredProcedureName = "proc_ManageAuth";

        private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public UserAuthRepository(IConfiguration configuration, IPasswordHasher<User> passwordHasher)
        {
            _configuration = configuration;
            _passwordHasher = passwordHasher;
            _connectionString = _configuration.GetConnectionString("EmployeesAuthConnectionString");
        }

        public async Task<int> SignupAsync(User user, string password)
        {
            try
            {
                using (var connection = CreateConnection())
                {
                    // Check if the email is already registered
                    var isEmailRegistered = await IsEmailRegisteredAsync(user.Email);
                    if (isEmailRegistered)
                    {
                        throw new ValidationException("Email Already Exists");
                    }

                    // Hash the password and generate a new user ID
                    user.Id = Guid.NewGuid().ToString();
                    user.PasswordHash = _passwordHasher.HashPassword(user, password);

                    // Call the stored procedure to insert the user
                    await connection.ExecuteAsync(
                        StoredProcedureName,
                        new
                        {
                            Action = "Signup",
                            Id = user.Id,
                            UserName = user.Username,
                            Email = user.Email,
                            PasswordHash = user.PasswordHash
                        },
                        commandType: CommandType.StoredProcedure
                    );

                    // Handle role assignments in C# code
                    if (user.Roles != null && user.Roles.Any())
                    {
                        // Fetch Role IDs from the database
                        var roleIds = await connection.QueryAsync<string>(
                       "SELECT Id FROM AspNetRoles WHERE NormalizedName IN @RoleNames",
                         new { RoleNames = user.Roles.Select(r => r.ToUpper()) }
                          );


                        // Insert UserId and RoleId into AspNetUserRoles
                        foreach (var roleId in roleIds)
                        {
                            await connection.ExecuteAsync(
                                "INSERT INTO AspNetUserRoles (UserId, RoleId) VALUES (@UserId, @RoleId)",
                                new { UserId = user.Id, RoleId = roleId }
                            );
                        }
                    }

                    return 1; // Return success
                }
            }
            catch(DuplicateEmailException) 
            {
                throw;
            }
        }

        public async Task<User?> LoginAsync(string email, string password)
        {
                using (var connection = CreateConnection())
                {
                    var user = await connection.QueryFirstOrDefaultAsync<User>(
                        StoredProcedureName,
                        new { Action = "Login", Email = email },
                        commandType: CommandType.StoredProcedure
                    );

                    if (user != null)
                    {
                        user.Roles = user.RolesString.Split(',');
                    
                        // Verify password
                        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);

                        if (passwordVerificationResult == PasswordVerificationResult.Success)
                            return user;
                    }
                    return null;
                }
            
        }


        public async Task<bool> IsEmailRegisteredAsync(string email)
        {
                using (var connection = CreateConnection())
                {
                    var count = await connection.QueryFirstOrDefaultAsync<int>(
                        "SELECT COUNT(1) FROM AspNetUsers WHERE Email = @Email",
                        new { Email = email }
                    );
                    return count > 0;
                }
            
        }


    }
}

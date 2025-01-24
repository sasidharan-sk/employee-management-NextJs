
using Dapper;
using EployeeManagement.API.CustomExceptions;
using EployeeManagement.API.Models.Domain;
using EployeeManagement.API.Models.DTO;
using EployeeManagement.API.Repositories;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace EployeeManagement.API.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private const string storedProcedureName= "proc_ManageEmployee";
        private IDbConnection CreateConnection() => new SqlConnection(_connectionString);


        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("EmployeesConnectionString");
        }

        public async Task<(IEnumerable<Employee>, int)> GetAllEmployeesAsync(string? filterOn = null, string? filterQuery = null,
                                            string? sortOn = null, string? sortBy = null,
                                            int? pageNumber = 1, int? pageSize = 100)
        {
                using (var connection = CreateConnection())
                {
                var empCountQuery = "SELECT COUNT(*) as TotalEmpCount FROM Employees";
                var totalEmpCount = await connection.QueryFirstAsync<int>(empCountQuery);
                    var employees = await connection.QueryAsync<Employee>(
                        storedProcedureName,
                        new 
                        {  
                            Action = "Get_All_Employees", 
                            FilterOn = filterOn, 
                            FilterBy = filterQuery,
                            SortOn = sortOn,
                            SortBy = sortBy,
                            PageNumber = pageNumber,
                            PageSize = pageSize,
                        },
                        commandType: CommandType.StoredProcedure
                        );

                    return (employees,totalEmpCount);
                };
        }

        public async Task<Employee> GetEmployeeByIdAsync(Guid id)
        {
                using (var connection = CreateConnection())
                {
                    var createdEmployee = await connection.QueryFirstOrDefaultAsync<Employee>(storedProcedureName,
                        new { Action = "Get_Employee_ById", EmpId = id },
                        commandType: CommandType.StoredProcedure
                        );

                    return createdEmployee;
                }
        }

        public async Task<bool> IsDepartmentIdValidAsync(Guid departmentId)
        {
                using (var connection = CreateConnection())
                {
                    var result = await connection.QueryFirstOrDefaultAsync<int>(
                        "SELECT COUNT(1) FROM Departments WHERE DepartmentId = @DepartmentId",
                        new { DepartmentId = departmentId }
                    );
                    return result > 0;
                }
        }

        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            try
            {

                var isValidDepartmentId = await IsDepartmentIdValidAsync(employee.DepartmentId);
                var isEmailRegistered = await IsEmailRegisteredAsync(employee.Email);

                if (!isValidDepartmentId)
                {
                    throw new ValidationException("The provided department ID is invalid.");
                }

                
                if (isEmailRegistered)
                {
                    throw new ValidationException("Email Already Exists");
                }

                Guid generatedId = Guid.NewGuid();

                using (var connection = CreateConnection())
                {
                    var result = await connection.QueryFirstOrDefaultAsync<Employee>(
                        storedProcedureName,
                        new
                        {
                            Action = "Add_Employee",
                            EmpId = generatedId,
                            FirstName = employee.FirstName,
                            LastName = employee.LastName,
                            Gender = employee.Gender,
                            DateOfBirth = employee.DateOfBirth,
                            Email = employee.Email,
                            Phone = employee.Phone,
                            HireDate = employee.HireDate,
                            DepartmentId = employee.DepartmentId,
                        },
                        commandType: CommandType.StoredProcedure
                        );

                    return result;
                }
            }
            catch (IdValidationException)
            {
                throw;
            }
            catch(DuplicateEmailException)
            {
                throw;
            }

        }

        public async Task<Employee> UpdatemployeeAsync(Guid id, Employee employee)
        {
            try
            {
                var isValidDepartmentId = await IsDepartmentIdValidAsync(employee.DepartmentId);
                var isEmailRegistered = await IsEmailRegisteredAsync(employee.Email, id);

                if (!isValidDepartmentId)
                {
                    throw new ValidationException("The provided department ID is invalid.");
                }

                if (isEmailRegistered)
                {
                    throw new ValidationException("Email Already Exists");
                }
                using (var connection = CreateConnection())
                {
                    var updatedEmployee = await connection.QueryFirstOrDefaultAsync<Employee>(
                        storedProcedureName,
                        new
                        {
                            Action = "Update_Employee",
                            EmpId = id,
                            FirstName = employee.FirstName,
                            LastName = employee.LastName,
                            DepartmentId = employee.DepartmentId,
                            Gender = employee.Gender,
                            DateOfBirth = employee.DateOfBirth,
                            Email = employee.Email,
                            Phone = employee.Phone,
                            HireDate = employee.HireDate,
                        },
                        commandType: CommandType.StoredProcedure
                        );
                    return updatedEmployee;
                }
            }
            catch (IdValidationException)
            {
                throw;
            }
            catch (DuplicateEmailException)
            {
                throw;
            }
        }

        public async Task<int> DeleteEmployeeAsync(Guid id)
        {
                using (var connection = CreateConnection())
                {
          
                var result = await connection.ExecuteAsync(
                        storedProcedureName,
                        new
                        {
                            Action = "Delete_Employee",
                            EmpId = id
                        },
                        commandType: CommandType.StoredProcedure
                        );
                    return result;
                }
        }

        public async Task<(IEnumerable<EmployeeV2>, int)> GetAllEmployeesV2Async(string? filterOn = null, string? filterQuery = null,
                                            string? sortOn = null, string? sortBy = null,
                                            int? pageNumber = 1, int? pageSize = 200)
        {
            using (var connection = CreateConnection())
            {
                var empCountQuery = "SELECT COUNT(*) as TotalEmpCount FROM Employees";
                var totalEmpCount = await connection.QueryFirstAsync<int>(empCountQuery);
                var employees = await connection.QueryAsync<EmployeeV2>(
                    storedProcedureName,
                    new
                    {
                        Action = "Get_All_EmployeesV2",
                        FilterOn = filterOn,
                        FilterBy = filterQuery,
                        SortOn = sortOn,
                        SortBy = sortBy,
                        PageNumber = pageNumber,
                        PageSize = pageSize,
                    },
                    commandType: CommandType.StoredProcedure
                    );

                return (employees, totalEmpCount);
            };
        }

        public async Task<bool> IsEmailRegisteredAsync(string email, Guid? employeeId = null)
        {
            using (var connection = CreateConnection())
            {
                var query = @"
            SELECT COUNT(1) 
            FROM Employees 
            WHERE Email = @Email";

                if (employeeId.HasValue)
                {
                    query += " AND EmpId != @EmployeeId"; // Exclude the current employee
                }

                var count = await connection.QueryFirstOrDefaultAsync<int>(
                    query,
                    new { Email = email, EmployeeId = employeeId }
                );

                return count > 0;
            }
        }

    }
}

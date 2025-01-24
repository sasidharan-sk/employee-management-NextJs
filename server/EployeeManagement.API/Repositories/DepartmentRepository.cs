using Dapper;
using EployeeManagement.API.Models.Domain;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EployeeManagement.API.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private IDbConnection CreateConnection() => new SqlConnection(_connectionString);

        public DepartmentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("EmployeesConnectionString");
        }
        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            using (var connection = CreateConnection())
            {
                var getAllQuery = "SELECT * FROM Departments";
                var departments = await connection.QueryAsync<Department>(getAllQuery);

                return departments;
            }
        }
    }
}

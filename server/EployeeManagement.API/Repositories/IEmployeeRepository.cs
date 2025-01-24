using EployeeManagement.API.Models.Domain;
using EployeeManagement.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace EployeeManagement.API.Repositories
{
    public interface IEmployeeRepository
    {
        Task<(IEnumerable<Employee>, int)> GetAllEmployeesAsync(string? filterOn = null, string? filterQuery = null, 
            string? sortOn = null,string? sortBy = null,
            int? pageNumber = 1, int? pageSize = 100);

        Task<(IEnumerable<EmployeeV2>, int)> GetAllEmployeesV2Async(string? filterOn = null, string? filterQuery = null,
            string? sortOn = null, string? sortBy = null,
            int? pageNumber = 1, int? pageSize = 100);

        Task<Employee> GetEmployeeByIdAsync(Guid id);

        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> UpdatemployeeAsync(Guid id, Employee employee);

        Task<int> DeleteEmployeeAsync(Guid id);
    }
}

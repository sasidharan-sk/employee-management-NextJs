using EployeeManagement.API.Models.Domain;

namespace EployeeManagement.API.Repositories
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
    }
}

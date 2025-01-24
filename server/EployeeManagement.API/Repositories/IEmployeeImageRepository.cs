using EployeeManagement.API.Models.Domain;

namespace EployeeManagement.API.Repositories
{
    public interface IEmployeeImageRepository
    {
        Task<EmployeeImage> UploadAsync(EmployeeImage image);

        Task<EmployeeImage> DeleteAsync(Guid id);
    }
}

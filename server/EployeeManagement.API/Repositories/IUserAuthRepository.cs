using EployeeManagement.API.Models.Domain;

namespace EployeeManagement.API.Repositories
{
    public interface IUserAuthRepository
    {
        Task<int> SignupAsync(User user, string password);
        Task<User?> LoginAsync(string email, string password);
        Task<bool> IsEmailRegisteredAsync(string email);
    }
}

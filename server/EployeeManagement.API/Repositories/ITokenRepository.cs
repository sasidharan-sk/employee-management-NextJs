using EployeeManagement.API.Models.Domain;

namespace EployeeManagement.API.Repositories
{
    public interface ITokenRepository
    {
        string CreateJwtToken(User user, List<string> roles);
    }
}

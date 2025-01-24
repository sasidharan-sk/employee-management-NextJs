namespace EployeeManagement.API.Models.Domain
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string [] Roles { get; set; }

        public string RolesString { get; set; }
    }

}

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EployeeManagement.API.Data
{
    public class EmployeeAuthDbContext : IdentityDbContext
    {
        public EmployeeAuthDbContext(DbContextOptions<EmployeeAuthDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var readerRoleId = "073ae6d4-1c0c-4e35-b2ba-9746772ce61d";
            var writerRoleId = "fd4a160b-4404-46da-a7fe-2f40cfa78cad";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = readerRoleId,
                    ConcurrencyStamp = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper()
                },
                new IdentityRole
                {
                    Id = writerRoleId,
                    ConcurrencyStamp = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper()
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}

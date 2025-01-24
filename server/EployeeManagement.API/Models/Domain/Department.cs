using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.Domain
{
    public class Department
    {
        [Key]
        public Guid DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }
}

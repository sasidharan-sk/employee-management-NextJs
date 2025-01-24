using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.Domain
{
    public class Employee
    {
        [Key]
        public Guid EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime HireDate {  get; set; }
        public Guid DepartmentId { get; set; }

        public string DepartmentName { get; set; }
    }

    public class EmployeeV2
    {
        [Key]
        public Guid EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime HireDate { get; set; }
        public Guid DepartmentId { get; set; }

        public string DepartmentName { get; set; }

        public string? ProfileImageUrl { get; set; }
    }
}

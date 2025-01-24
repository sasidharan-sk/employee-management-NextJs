using EployeeManagement.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace EployeeManagement.API.Models.DTO
{
    public class EmployeeDto
    {
        public Guid EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime HireDate { get; set; }
        public string DepartmentName { get; set; }
        public Guid DepartmentId { get; set; }
    }

    public class EmployeeDtoV2
    {
        public Guid EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime HireDate { get; set; }
        public string DepartmentName { get; set; }

        public string? ProfileImgUrl { get; set; }
    }
}

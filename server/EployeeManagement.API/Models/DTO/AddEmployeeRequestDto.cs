using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.DTO
{
    public class AddEmployeeRequestDto
    {
        [Required]
        [MaxLength(20, ErrorMessage = "First Name cannot be longer than 20 characters")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "Last Name cannot be longer than 20 characters")]
        public string LastName { get; set; }

        [Required]
        [MaxLength(6, ErrorMessage = "Gender cannot be longer than 6 characters")]
        [MinLength(4, ErrorMessage = "Gender cannot be shorter than 4 characters")]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        [Required]
        [MaxLength(15, ErrorMessage = "Phone number cannot be longer than 15 digits")]
        public string Phone { get; set; }

        [Required]
        public DateTime HireDate { get; set; }
        [Required]
        public Guid DepartmentId { get; set; }
    }
}

﻿using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.DTO
{
    public class RegisterUserRequestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string [] Roles { get; set; }
    }
}

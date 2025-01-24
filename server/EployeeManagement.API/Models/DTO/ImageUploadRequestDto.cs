using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.DTO
{
    public class ImageUploadRequestDto

    {
        [Required]
        public Guid EmpId { get; set; }
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string FileName { get; set; }

        public string? FileDescription { get; set; }
    }
}

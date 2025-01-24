using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EployeeManagement.API.Models.Domain
{
    public class EmployeeImage
    {
        [Key]
        public Guid Id { get; set; }

        public Guid EmpId { get; set; }

        public string FileName { get; set; }

        public IFormFile File { get; set; }

        public string? FileDescription { get; set; }

        public string FileExtension { get; set; }

        public long FileSizeInBytes { get; set; }
        
        public string FilePath { get; set; }
    }
}

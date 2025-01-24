using System.ComponentModel.DataAnnotations;

namespace EployeeManagement.API.Models.Domain
{
    public class Project
    {
        [Key]
        public Guid ProjectId { get; set; }

        public string ProjectName { get; set; }

        public Guid EmpID { get; set; }


        // Navigation Props

        public Employee Employee { get; set; }
    }
}

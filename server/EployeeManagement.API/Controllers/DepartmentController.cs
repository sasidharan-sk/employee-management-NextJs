using Asp.Versioning;
using EployeeManagement.API.Models.DTO;
using EployeeManagement.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EployeeManagement.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentController(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        [HttpGet]
        [MapToApiVersion("1.0")]
        public async Task<ActionResult<IEnumerator<DepartmentDto>>> GetAllDepartments()
        {
            var departments = await _departmentRepository.GetAllDepartmentsAsync();

            var departmentsList = new List<DepartmentDto>();

            // Domain to Dto

            foreach(var department in departments)
            {
                var result = new DepartmentDto
                {
                    DepartmentId = department.DepartmentId,
                    DepartmentName = department.DepartmentName,
                };

                departmentsList.Add(result);
            }
            return Ok(departmentsList);
        }
    }
}

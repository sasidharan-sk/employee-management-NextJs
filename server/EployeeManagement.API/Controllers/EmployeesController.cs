using Asp.Versioning;
using EployeeManagement.API.CustomActionFilters;
using EployeeManagement.API.Data;
using EployeeManagement.API.Models.Domain;
using EployeeManagement.API.Models.DTO;
using EployeeManagement.API.Repositories;
using EployeeManagement.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace EployeeManagement.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")] // Support both v1.0 and v2.0 in this controller

    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _dbContext;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeesController(EmployeeDbContext dbContext, 
            IEmployeeRepository employeeRepository)
        {
            _dbContext = dbContext;
            _employeeRepository = employeeRepository;
        }


         // Get All Employees
         // GET: https://localhost:portnumber/api/Employees
        [HttpGet]
        [MapToApiVersion("1.0")]
        //[Authorize(Roles = "Reader")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAllV1([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                            [FromQuery] string? sortOn, [FromQuery] string? sortBy, 
                            [FromQuery] int? pageNumber, [FromQuery] int? pageSize )
        {
            try
            {
                var (employeesList, totalEmpCount) = await _employeeRepository.GetAllEmployeesAsync(filterOn, filterQuery, 
                    sortOn, sortBy, pageNumber, pageSize);

                //Domain to Dto

                var employeeListDto = new List<EmployeeDto>();

                foreach (var employee in employeesList)
                {
                    var result = new EmployeeDto
                    {
                        EmpId = employee.EmpId,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        DepartmentName = employee.DepartmentName,
                        Gender = employee.Gender,
                        DateOfBirth = employee.DateOfBirth,
                        Email = employee.Email,
                        Phone = employee.Phone,
                        HireDate = employee.HireDate
                    };

                    employeeListDto.Add(result);
                }

                var response = new
                {
                    TotalCount = totalEmpCount,
                    Employees = employeeListDto
                };
                return Ok(response);
            }
            catch(ArgumentException ex)
            {
               
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpGet]
        [MapToApiVersion("2.0")]
        //[Authorize(Roles = "Reader")]
        public async Task<ActionResult<IEnumerable<EmployeeDtoV2>>> GetAllV2([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
                            [FromQuery] string? sortOn, [FromQuery] string? sortBy,
                            [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            try
            {
                var (employeesList, totalEmpCount) = await _employeeRepository.GetAllEmployeesV2Async(filterOn, filterQuery,
                    sortOn, sortBy, pageNumber, pageSize);

                //Domain to Dto

                var employeeListDto = new List<EmployeeDtoV2>();

                foreach (var employee in employeesList)
                {
                    var result = new EmployeeDtoV2
                    {
                        EmpId = employee.EmpId,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        DepartmentName = employee.DepartmentName,
                        Gender = employee.Gender,
                        DateOfBirth = employee.DateOfBirth,
                        Email = employee.Email,
                        Phone = employee.Phone,
                        HireDate = employee.HireDate,
                        ProfileImgUrl = employee.ProfileImageUrl
                    };

                    employeeListDto.Add(result);
                }
                var response = new
                {
                    TotalCount = totalEmpCount,
                    Employees = employeeListDto
                };
                return Ok(response);
            }
            catch (ArgumentException ex)
            {

                return BadRequest(new { Message = ex.Message });
            }
        }


        // Get By Employee ID
        // GET: https://localhost:portnumber/api/Employees/{id}
        [HttpGet]
        [MapToApiVersion("1.0")]
        //[Authorize(Roles = "Reader")]
        [Route("{id:Guid}")]

        public async Task<ActionResult<EmployeeDto>> GetById([FromRoute] Guid id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (employee == null)
                {
                    return NotFound();
                }

                // Domain to Dto
                var employeeDto = new EmployeeDto
                {
                    EmpId = employee.EmpId,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    DepartmentName = employee.DepartmentName,
                    Gender = employee.Gender,
                    DateOfBirth = employee.DateOfBirth,
                    Email = employee.Email,
                    Phone = employee.Phone,
                    HireDate = employee.HireDate,
                    DepartmentId = employee.DepartmentId,
                };

                return Ok(employeeDto);
            }
            catch (ArgumentException ex)
            {
               
                return BadRequest(new { Message = ex.Message });
            }
        }
        [HttpPost]
        [MapToApiVersion("1.0")]
        //[Authorize(Roles = "Writer")]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddEmployeeRequestDto addEmployeeDto)
        {
            try
            {
                // DTO to Domain
                var employeeDomain = new Employee
                {
                    FirstName = addEmployeeDto.FirstName,
                    LastName = addEmployeeDto.LastName,
                    Gender = addEmployeeDto.Gender,
                    DateOfBirth = addEmployeeDto.DateOfBirth,
                    Email = addEmployeeDto.Email,
                    Phone = addEmployeeDto.Phone,
                    HireDate = addEmployeeDto.HireDate,
                    DepartmentId = addEmployeeDto.DepartmentId,
                };

                var result = await _employeeRepository.CreateEmployeeAsync(employeeDomain);

                // Domain to Dto
                var employeeDto = new EmployeeDto
                {
                    EmpId = result.EmpId,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    DepartmentName = result.DepartmentName,
                    Gender = result.Gender,
                    DateOfBirth = result.DateOfBirth,
                    Email = result.Email,
                    Phone = result.Phone,
                    HireDate = result.HireDate,
                };

                return CreatedAtAction(nameof(GetById), new { id = employeeDto.EmpId }, employeeDto);
            }
            catch (ArgumentException ex)
            {
                
                return BadRequest(new { Message = ex.Message });
            }
        }

        // Updat employee
        // GET: https://localhost:portnumber/api/Employees/{id}
        [HttpPut]
        [MapToApiVersion("1.0")]
        //[Authorize(Roles = "Writer")]
        [ValidateModel]
        [Route("{id:Guid}")]
        public async Task<ActionResult<EmployeeDto>> Update(
            [FromRoute] Guid id, 
            [FromBody] EditEmployeeRequestDto editEmployeeRequestDto)
        {
            try
            {
                var isEmployeeExist = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (isEmployeeExist == null)
                {
                    return NotFound();
                }

                // Dto to Domain
                var employeeDomain = new Employee
                {
                    FirstName = editEmployeeRequestDto.FirstName,
                    LastName = editEmployeeRequestDto.LastName,
                    DepartmentId = editEmployeeRequestDto.DepartmentId,
                    Gender = editEmployeeRequestDto.Gender,
                    DateOfBirth = editEmployeeRequestDto.DateOfBirth,
                    Email = editEmployeeRequestDto.Email,
                    Phone = editEmployeeRequestDto.Phone,
                    HireDate = editEmployeeRequestDto.HireDate,
                };

                var updatedEmployee = await _employeeRepository.UpdatemployeeAsync(id, employeeDomain);

                // Domain to Dto
                var employeeDto = new EmployeeDto
                {
                    EmpId = updatedEmployee.EmpId,
                    FirstName = updatedEmployee.FirstName,
                    LastName = updatedEmployee.LastName,
                    DepartmentName = updatedEmployee.DepartmentName,
                    Gender = updatedEmployee.Gender,
                    DateOfBirth = updatedEmployee.DateOfBirth,
                    Email = updatedEmployee.Email,
                    Phone = updatedEmployee.Phone,
                    HireDate = updatedEmployee.HireDate,
                };

                return Ok(employeeDto);
            }
            catch (ArgumentException ex)
            {
                
                return BadRequest(new { Message = ex.Message });
            }
        }



        [HttpDelete]
        [MapToApiVersion("1.0")]
        //[Authorize(Roles = "Writer")]
        [Route("{id:Guid}")]

        public async Task<ActionResult<EmployeeDto>> Delete([FromRoute] Guid id)
        {
            try
            {
                var isEmployeeExist = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (isEmployeeExist == null)
                {
                    return NotFound();
                }

                var deletedEmployee = await _employeeRepository.DeleteEmployeeAsync(id);

                //Domain to Dto
                var employeeDto = new EmployeeDto
                {
                    EmpId = isEmployeeExist.EmpId,
                    FirstName = isEmployeeExist.FirstName,
                    LastName = isEmployeeExist.LastName,
                    DepartmentName = isEmployeeExist.DepartmentName,
                    Gender = isEmployeeExist.Gender,
                    DateOfBirth = isEmployeeExist.DateOfBirth,
                    Email = isEmployeeExist.Email,
                    Phone = isEmployeeExist.Phone,
                    HireDate = isEmployeeExist.HireDate,
                };

                return Ok(employeeDto);
            }
            catch (ArgumentException ex)
            {
               
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}

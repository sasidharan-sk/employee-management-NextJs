using EployeeManagement.API.Models.Domain;
using EployeeManagement.API.Models.DTO;
using EployeeManagement.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeImagesController : ControllerBase
    {
        private readonly IEmployeeImageRepository _employeeImageRepository;

        public EmployeeImagesController(IEmployeeImageRepository employeeImageRepository)
        {
            _employeeImageRepository = employeeImageRepository;
        }

        [HttpPost]
        [Route("Upload")]
        public async Task<IActionResult> Upload([FromForm] ImageUploadRequestDto request)
        {
                ValidateFileUpload(request);

                if (ModelState.IsValid)
                {
                    //DTO to Domain

                    var imageDomainModel = new EmployeeImage
                    {
                        EmpId = request.EmpId,
                        File = request.File,
                        FileName = request.FileName,
                        FileDescription = request.FileDescription,
                        FileSizeInBytes = request.File.Length,
                        FileExtension = Path.GetExtension(request.File.FileName)
                    };

                    await _employeeImageRepository.UploadAsync(imageDomainModel);

                    return Ok(imageDomainModel);
                }
            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(ImageUploadRequestDto request)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(Path.GetExtension(request.File.FileName)))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }

            if (request.File.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size exceeds more than 10MB");
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                var deletedImage = await _employeeImageRepository.DeleteAsync(id);

                if (deletedImage != null)
                {
                    return Ok(deletedImage);
                }
                return NotFound();
            }
            catch (ArgumentException ex)
            {

                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}

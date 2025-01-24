using Asp.Versioning;
using EployeeManagement.API.Models.Domain;
using EployeeManagement.API.Models.DTO;
using EployeeManagement.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EployeeManagement.API.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")] // Support both v1.0 and v2.0 in this controller
    public class AuthController : ControllerBase
    {
        private readonly IUserAuthRepository _userAuthRepository;
        private readonly ITokenRepository _tokenRepository;

        public AuthController(IUserAuthRepository userAuthRepository, ITokenRepository tokenRepository)
        {
            _userAuthRepository = userAuthRepository;
            _tokenRepository = tokenRepository;
        }


        [HttpPost]
        [Route("Register")]

        public async Task<IActionResult> Register([FromBody] RegisterUserRequestDto registerUserRequestDto)
        {
            // Dto to Domain
            try
            {
                var registerUserReqDomain = new User
                {
                    Username = registerUserRequestDto.Username,
                    Email = registerUserRequestDto.Username,
                    Roles = registerUserRequestDto.Roles
                };

                var createdUser = await _userAuthRepository.SignupAsync(registerUserReqDomain,
                                    registerUserRequestDto.Password);

                    return Ok("User created successfully");

            }
            catch (ArgumentException ex)
            {

                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {

            var authenticatedUser = await _userAuthRepository.LoginAsync(loginRequestDto.Username,
                                loginRequestDto.Password);

            if (authenticatedUser != null)
            {
                if(authenticatedUser.Roles.Any())
                {
                    // convert array to List
                    var rolesList = new List<string>(authenticatedUser.Roles);

                    //Create Token
                    var jwtToken = _tokenRepository.CreateJwtToken(authenticatedUser, rolesList);

                    var response = new LoginResponseDto
                    {
                        JwtToken = jwtToken,
                    };
                    return Ok(response);
                }
            }

            return BadRequest("Username or Password is wrong.");
        }
    }
}

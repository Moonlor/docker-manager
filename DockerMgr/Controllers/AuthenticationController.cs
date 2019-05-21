using DockerMgr.DTO;
using DockerMgr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DockerMgr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthenticateService _authService;
        
        public AuthenticateController(IAuthenticateService authService)
        {
            _authService = authService;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] TokenRequestDTO requestDto)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token;
            if (_authService.IsAuthenticated(requestDto, out token))
            {
                return Ok(token);
            }

            return BadRequest("Invalid Request");
        }
    }
}
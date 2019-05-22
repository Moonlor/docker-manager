using DockerMgr.DTO;
using DockerMgr.Models;
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
        private readonly UserService _userService;
        
        public AuthenticateController(IAuthenticateService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("login")]
        public ActionResult<Msg> Login([FromBody] TokenRequestDTO requestDto)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token;
            
            if (_authService.IsAuthenticated(requestDto, out token))
            {
                return new Msg{
                    Message = MsgCode.SUCCESS,
                    Data = new UserLoginDTO{
                        Email = requestDto.Email.ToLower(),
                        Token = token,
                        Id = "213123213"
                    }
                };
            }

            return BadRequest("Invalid Request");
        }
        
        [AllowAnonymous]
        [HttpPost, Route("signup")]
        public ActionResult<Msg> Signup([FromBody] CreateUserDTO createUserDto)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token = _authService.GenerateToken(createUserDto.Email.ToLower());
            User theUser = _userService.Create(createUserDto, token);

            return new Msg
            {
                Message = MsgCode.SUCCESS,
                Data = new UserLoginDTO
                {
                    Email = theUser.Email.ToLower(),
                    Token = theUser.Token,
                    Id = theUser.Id
                }
            };
        }

        [HttpPost, Route("logout")]
        [Authorize]
        public ActionResult<Msg> Logout([FromBody] CreateUserDTO createUserDto)
        {
            return new Msg
            {
                Message = MsgCode.SUCCESS
            };
        }
        
        
    }
}
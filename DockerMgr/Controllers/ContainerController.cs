using DockerMgr.DTO;
using DockerMgr.Services;
using DockerMgr.Services.impl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DockerMgr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContainerController : ControllerBase
    {
        private readonly IContainerService _containerService;
        
        public ContainerController(IContainerService containerService)
        {
            _containerService = containerService;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("get")]
        public ActionResult<Msg> GetAll([FromBody] TokenRequestDTO requestDto)
        {
            var ip = requestDto.Email;
            return new Msg{
                Message = MsgCode.SUCCESS,
                Data = _containerService.GetAll(ip)
            };
        }
    }
}
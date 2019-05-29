using DockerMgr.Utils;
using DockerMgr.Utils.ContainerDTO;
using DockerMgr.Utils.ServerDTO;
using DockerMgr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DockerMgr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        private readonly IServerService _serverService;
        
        public ServerController(IServerService serverService)
        {
            _serverService = serverService;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("create")]
        public ActionResult<Msg> Create([FromBody] CreateServerDTO createServerDto)
        {
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = _serverService.Create(createServerDto)
            };
            return r;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("delete")]
        public ActionResult<Msg> Delete([FromBody] DeleteServerDTO deleteServerDto)
        {
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = _serverService.Delete(deleteServerDto)
            };
            return r;
        }
        
        
    }
}
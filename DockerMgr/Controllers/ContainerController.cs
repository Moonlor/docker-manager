using DockerMgr.Utils;
using DockerMgr.Utils.ContainerDTO;
using DockerMgr.Services;
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
        [HttpPost, Route("all_by_id")]
        public ActionResult<Msg> GetAllById([FromBody] GetContainersByIdDTO containersByIdDto)
        {
            var id = containersByIdDto.Id;
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = _containerService.GetAllById(id)
            };
            return r;
        }
    }
}
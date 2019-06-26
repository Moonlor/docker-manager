using System;
using DockerMgr.DTO;
using DockerMgr.DTO.ContainerDTO;
using DockerMgr.Services;
using DockerMgr.Utils;
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
        
        [AllowAnonymous]
        [HttpPost, Route("stop")]
        public ActionResult<Msg> Stop([FromBody] StopOneContainerDTO stopOneContainerDto)
        {
            var id = stopOneContainerDto.Id;
            var ip = stopOneContainerDto.Ip;
            _containerService.StopOne(id, ip);
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = true
            };

            return r;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("remove")]
        public ActionResult<Msg> Remove([FromBody] RemoveOneContainerDTO removeOneContainerDto)
        {
            var id = removeOneContainerDto.Id;
            var ip = removeOneContainerDto.Ip;
            _containerService.RemoveOne(id, ip);
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = true
            };
            return r;
        }
        
        [AllowAnonymous]
        [HttpPost, Route("run")]
        public ActionResult<Msg> Run([FromBody] RunOneContainerDTO runOneContainerDto)
        {
            var image = runOneContainerDto.Image;
            var ip = runOneContainerDto.Ip;
            try
            {
                _containerService.RunOne(image, ip);
            }
            catch (Exception e)
            {
                var er = new Msg{
                    Message = MsgCode.RES_ERROR,
                    Data = e
                };

                return er;
            }
            
            var r = new Msg{
                Message = MsgCode.SUCCESS,
                Data = true
            };
            return r;
        }
    }
}
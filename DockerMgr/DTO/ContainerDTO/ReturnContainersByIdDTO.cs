using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Docker.DotNet.Models;
using DockerMgr.Models;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ContainerDTO
{
    public class ReturnContainersByIdDTO
    {
        [Required] 
        [JsonProperty("servers")]
        public List<Server> Servers { get; set; }
        
        [Required] 
        [JsonProperty("containers")]
        public List<IList<ContainerListResponse>> Containers { get; set; }
    }
}
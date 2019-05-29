using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Docker.DotNet.Models;
using DockerMgr.Models;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ContainerDTO
{
    public class RemoveOneContainerDTO
    {
        [Required] 
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [Required] 
        [JsonProperty("ip")]
        public string Ip { get; set; }
    }
}
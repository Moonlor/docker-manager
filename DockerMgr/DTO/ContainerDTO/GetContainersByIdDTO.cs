using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ContainerDTO
{
    public class GetContainersByIdDTO
    {
        [Required] 
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
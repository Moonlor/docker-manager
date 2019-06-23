using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ImageDTO
{
    public class QueryImageDTO
    {
        [Required] 
        [JsonProperty("guid")]
        public string Guid { get; set; }
    }
}
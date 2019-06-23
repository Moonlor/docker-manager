using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ImageDTO
{
    public class PullImageDTO
    {
        [Required] 
        [JsonProperty("ip")]
        public string Ip { get; set; }
        
        [Required] 
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [Required] 
        [JsonProperty("tag")]
        public string Tag { get; set; }
    }
}
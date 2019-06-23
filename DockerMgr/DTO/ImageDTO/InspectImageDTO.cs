using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ImageDTO
{
    public class InspectImageDTO
    {
        [Required] 
        [JsonProperty("ip")]
        public string Ip { get; set; }
        
        [Required] 
        [JsonProperty("name")]
        public string name { get; set; }
    }
}
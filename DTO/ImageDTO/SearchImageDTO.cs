using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DTO.ImageDTO
{
    public class SearchImageDTO
    {
        [Required] 
        [JsonProperty("ip")]
        public string Ip { get; set; }
        
        [Required] 
        [JsonProperty("keyWord")]
        public string KeyWord { get; set; }
    }
}
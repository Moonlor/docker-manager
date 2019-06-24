using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DTO.ServerDTO
{
    public class CreateServerDTO
    {
        [Required] 
        [JsonProperty("provider")]
        public string Provider { get; set; }
        
        
        [Required]
        [JsonProperty("ip")]
        public string Ip { get; set; }
        
        [Required]
        [JsonProperty("introduction")]
        public string Introduction { get; set; }
            
        [Required]
        [JsonProperty("endpoint")]
        public string Endpoint { get; set; }
        
        [Required]
        [JsonProperty("userId")]
        public string UserId { get; set; }
    }
}
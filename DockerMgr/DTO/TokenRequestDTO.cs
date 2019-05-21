using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO
{
    public class TokenRequestDTO
    {
        [Required] 
        [JsonProperty("username")]
        public string Username { get; set; }
        
        
        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DTO
{
    public class UserLoginDTO
    {
        [Required] 
        [JsonProperty("token")]
        public string Token { get; set; }
        
        
        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }
        
        [Required]
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
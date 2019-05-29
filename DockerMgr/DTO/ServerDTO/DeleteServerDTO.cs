using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.Utils.ServerDTO
{
    public class DeleteServerDTO
    {
        [Required]
        [JsonProperty("id")]
        public string Id { get; set; }
        
        [Required]
        [JsonProperty("userId")]
        public string UserId { get; set; }
    }
}
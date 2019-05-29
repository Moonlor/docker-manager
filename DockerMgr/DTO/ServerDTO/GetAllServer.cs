using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.Utils.ServerDTO
{
    public class GetAllServer
    {
        [Required]
        [JsonProperty("userId")]
        public string UserId { get; set; }
    }
}
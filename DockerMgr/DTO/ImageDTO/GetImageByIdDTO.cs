using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ImageDTO
{
    public class GetImageByIdDTO
    {
        [Required] 
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
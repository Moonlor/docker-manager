using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace DTO.ImageDTO
{
    public class GetImageByIdDTO
    {
        [Required] 
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
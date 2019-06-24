using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Docker.DotNet.Models;
using Newtonsoft.Json;

namespace DTO.ContainerDTO
{
    public class RunOneContainerDTO
    {
        [Required] 
        [JsonProperty("image")]
        public string Image { get; set; }
        
        [Required] 
        [JsonProperty("ip")]
        public string Ip { get; set; }
    }
}
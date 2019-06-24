using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Docker.DotNet.Models;
using Models;
using Newtonsoft.Json;

namespace DTO.ContainerDTO
{
    public class ReturnContainersById
    {
        [Required] 
        [JsonProperty("servers")]
        public List<Server> Servers { get; set; }
        
        [Required] 
        [JsonProperty("containers")]
        public List<IList<ContainerListResponse>> Containers { get; set; }
    }
}
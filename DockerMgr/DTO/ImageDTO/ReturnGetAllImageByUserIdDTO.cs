using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Docker.DotNet.Models;
using Newtonsoft.Json;

namespace DockerMgr.DTO.ImageDTO
{
    public class ReturnGetAllImageByUserIdDTO
    {
        [Required] 
        [JsonProperty("images")]
        public Dictionary<string, IList<ImagesListResponse>> Images { get; set; }
    }
}
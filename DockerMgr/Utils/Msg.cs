using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DockerMgr.Utils
{
    public class Msg
    {
        [Required]
        [JsonProperty("data")]
        public Object Data { get; set; }
        
        [Required]
        [JsonProperty("msg")]
        public string Message { get; set; }
    }
}
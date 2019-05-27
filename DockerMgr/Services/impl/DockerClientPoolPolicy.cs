using System;
using Docker.DotNet;
using Microsoft.Extensions.ObjectPool;

namespace DockerMgr.Services.impl
{
    public class DockerClientPoolPolicy : IPooledObjectPolicy<DockerClient>
    {
        private readonly string _ip;
        
        public DockerClientPoolPolicy(string ip)
        {
            _ip = ip;
        }
        
        public DockerClient Create()
        {
            return new DockerClientConfiguration(new Uri($"http://{_ip}:2375")).CreateClient();
        }
    
        public bool Return(DockerClient obj)
        {
            return true;
        }
    }
}
using Docker.DotNet;
using Microsoft.Extensions.ObjectPool;

namespace DockerMgr.Services
{
    public interface IDockerClientPoolCollection
    {
        DefaultObjectPool<DockerClient> GetPoolByIp(string ip); 
        
        DefaultObjectPool<DockerClient> AddPool(string ip);

        void RemovePool(string ip);
    }
}
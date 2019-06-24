using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Docker.DotNet;
using Microsoft.Extensions.ObjectPool;

namespace DockerClientPool
{
    public class DockerClientPoolCollection : IDockerClientPoolCollection
    {
        private ConcurrentDictionary<string, DefaultObjectPool<DockerClient>> _clientPools = 
            new ConcurrentDictionary<string, DefaultObjectPool<DockerClient>>();

        public DefaultObjectPool<DockerClient> GetPoolByIp(string ip)
        {
            var thePool = _clientPools.FirstOrDefault(p => p.Key == ip).Value ?? AddPool(ip);

            return thePool;
        }
        
        public DefaultObjectPool<DockerClient> AddPool(string ip)
        {
            var demoPolicy = new DockerClientPoolPolicy(ip);
            var dockerPool = new DefaultObjectPool<DockerClient>(demoPolicy,3);
            _clientPools.TryAdd(ip, dockerPool);
            return dockerPool;
        }

        public void RemovePool(string ip)
        {
            DefaultObjectPool<DockerClient> pool;
            _clientPools.TryRemove(ip, out pool);
        }

        private string CreateUId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
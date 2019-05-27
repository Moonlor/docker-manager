using System;
using System.Collections.Generic;
using Docker.DotNet;
using Docker.DotNet.Models;
using DockerMgr.DTO;

namespace DockerMgr.Services.impl
{
    public class ContainerService : IContainerService
    {
        private readonly IDockerClientPoolCollection _pools;

        public ContainerService(IDockerClientPoolCollection pools)
        {
            _pools = pools;
        }
        
        public IList<ContainerListResponse> GetAll(string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get();
            ContainersListParameters p = new ContainersListParameters()
            {
                All = true
            };
            var containers = client.Containers.ListContainersAsync(p).GetAwaiter().GetResult();

            return containers;
        }
    }
}
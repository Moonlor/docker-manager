using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ContainerDTO;
using DockerMgr.Models;

namespace DockerMgr.Services.impl
{
    public class ContainerService : IContainerService
    {
        private readonly IDockerClientPoolCollection _pools;
        private readonly IServerService _serverService;

        public ContainerService(IDockerClientPoolCollection pools, IServerService serverService)
        {
            _pools = pools;
            _serverService = serverService;
        }
        
        public ReturnContainersByIdDTO GetAllById(string userId)
        {
            List<Server> servers = _serverService.GetAll(userId);
            var res = new ReturnContainersByIdDTO()
            {
                Servers = new List<Server>(),
                Containers = new List<IList<ContainerListResponse>>()
            };
            foreach (var i in servers)
            {
                var client = _pools.GetPoolByIp(i.Ip).Get();
                ContainersListParameters p = new ContainersListParameters()
                {
                    All = true
                };
                var containers = client.Containers.ListContainersAsync(p).GetAwaiter().GetResult();
                res.Servers.Add(i);
                res.Containers.Add(containers);
            }

            return res;
        }
    }
}
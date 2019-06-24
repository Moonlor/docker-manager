using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerClientPool;
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
        
        public ReturnContainersById GetAllById(string userId)
        {
            List<Server> servers = _serverService.GetAll(userId);
            var res = new ReturnContainersById()
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

        public void StopOne(string id, string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get(); 
            client.Containers.StopContainerAsync(id, new ContainerStopParameters()).GetAwaiter().GetResult();
        }
        
        public void RemoveOne(string id, string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get(); 
            client.Containers.RemoveContainerAsync(id, new ContainerRemoveParameters()).GetAwaiter().GetResult();
        }
        
        public void RunOne(string image, string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get();
            var p = new CreateContainerParameters
            {
                Image = image,
                Cmd = new string[] {"/bin/bash"},
                Tty = true
            };
//            var p = new CreateContainerParameters
//            {
//                Image = image,
//                Cmd = new string[] {"/bin/bash"},
//                Tty = true,
//                HostConfig = new HostConfig
//                {
//                    PortBindings = new Dictionary<string, IList<PortBinding>>
//                    {
//                        { "5423", new List<PortBinding> { new PortBinding{HostPort = "7799"} } }
//                    }
//                }
//            };
            var createdContainer = client.Containers.CreateContainerAsync(p).GetAwaiter().GetResult();
            client.Containers.StartContainerAsync(createdContainer.ID, new ContainerStartParameters()).GetAwaiter().GetResult();
        }
    }
}
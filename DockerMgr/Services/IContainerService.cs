using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ContainerDTO;

namespace DockerMgr.Services
{
    public interface IContainerService
    {
        ReturnContainersById GetAllById(string ip);

        void StopOne(string id, string ip);

        void RemoveOne(string id, string ip);

        void RunOne(string image, string ip);
    }
}
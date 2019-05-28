using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ContainerDTO;

namespace DockerMgr.Services
{
    public interface IContainerService
    {
        ReturnContainersByIdDTO GetAllById(string ip);
    }
}
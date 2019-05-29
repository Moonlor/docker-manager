using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.Utils.ContainerDTO;

namespace DockerMgr.Services
{
    public interface IContainerService
    {
        ReturnContainersByIdDTO GetAllById(string ip);
    }
}
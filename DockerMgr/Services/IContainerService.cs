using System;
using System.Collections.Generic;
using Docker.DotNet.Models;

namespace DockerMgr.Services
{
    public interface IContainerService
    {
        IList<ContainerListResponse> GetAll(string ip);
    }
}
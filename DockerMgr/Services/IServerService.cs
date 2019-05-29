using System.Collections.Generic;
using DockerMgr.Utils.ServerDTO;
using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IServerService
    {
        bool Create(CreateServerDTO serverDto);

        bool Delete(DeleteServerDTO serverDto);

        List<Server> GetAll(string userId);
    }
}
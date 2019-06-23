using DockerMgr.DTO;
using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IUserService
    {
        User Get(string id);

        User GetByEmail(string email);

        User Create(CreateUserDTO userDto, string token);

        bool DisableUser(string id);
    }
}
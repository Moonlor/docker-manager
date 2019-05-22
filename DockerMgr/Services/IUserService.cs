using DockerMgr.DTO;
using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IUserService
    {
        User Get(string email, string id);

        User Create(CreateUserDTO userDto, string token);
    }
}
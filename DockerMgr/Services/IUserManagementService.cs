using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IUserManagementService
    {
        bool IsValidUser(string email , string password, out User checkedUser);
    }
}
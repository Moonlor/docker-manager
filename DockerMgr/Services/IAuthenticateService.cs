using DockerMgr.DTO;
using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IAuthenticateService
    {
        bool IsAuthenticated(TokenRequestDTO requestDto, out string token, out User theUser);

        string GenerateToken(string email);
    }
}
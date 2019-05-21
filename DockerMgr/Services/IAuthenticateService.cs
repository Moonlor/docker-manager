using DockerMgr.DTO;

namespace DockerMgr.Services
{
    public interface IAuthenticateService
    {
        bool IsAuthenticated(TokenRequestDTO requestDto, out string token);
    }
}
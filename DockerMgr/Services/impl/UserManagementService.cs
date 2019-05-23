using DockerMgr.Models;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using PWEncrypt;
using static PWEncrypt.Encrypt;

namespace DockerMgr.Services.impl
{
    public class UserManagementService : IUserManagementService
    {
        private readonly UserService _userService;
        
        public UserManagementService(IConfiguration config)
        {
            _userService = new UserService(config);
        }
        
        public bool IsValidUser(string email , string password, out User checkedUser)
        {
            checkedUser = _userService.GetByEmail(email);
            if (checkedUser == null)
            {
                return false;
            }
            string encryptedPWD = Encrypt.GetEncryptedPW(password, email);
            return checkedUser.Password == encryptedPWD;
        }
    }
}
using DockerMgr.DTO;
using DockerMgr.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using PWEncrypt;

namespace DockerMgr.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        
        public UserService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("dockerdb"));
            var database = client.GetDatabase("dockerdb");
            _users = database.GetCollection<User>("users");
        }

        public User GetByEmail(string email)
        {
            return _users.Find<User>(u => u.Email == email).FirstOrDefault();
        }

        public User Get(string id)
        {
            return _users.Find<User>(u => u.Id == id).FirstOrDefault();
        }

        public User Create(CreateUserDTO userDto, string token)
        {
            string encryptedPWD = Encrypt.GetEncryptedPW(userDto.Password, userDto.Email.ToLower());
            var newUser = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = encryptedPWD,
                Token = token
            };
            _users.InsertOne(newUser);
            
            return _users.Find<User>(u => u.Email == userDto.Email).FirstOrDefault();
        }

        public bool DisableUser(string id)
        {
            User theUser = Get(id);
            if (theUser == null)
            {
                return false;
            }

            theUser.Token = null;
            _users.ReplaceOne(u => u.Id == id, theUser);
            return true;
        }
    }
}
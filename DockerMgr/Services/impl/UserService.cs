using DockerMgr.DTO;
using DockerMgr.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

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

        public User Get(string email, string id)
        {
            return _users.Find<User>(u => u.Id == id).FirstOrDefault();
        }

        public User Create(CreateUserDTO userDto, string token)
        {
            var newUser = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                Token = token
            };
            _users.InsertOne(newUser);
            
            return _users.Find<User>(u => u.Email == userDto.Email).FirstOrDefault();
        }
    }
}
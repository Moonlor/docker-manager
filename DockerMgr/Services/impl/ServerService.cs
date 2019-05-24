using System.Collections.Generic;
using DockerMgr.DTO.ServerDTO;
using DockerMgr.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace DockerMgr.Services.impl
{
    public class ServerService : IServerService
    {
        private readonly IMongoCollection<Server> _servers;
        
        public ServerService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("dockerdb"));
            var database = client.GetDatabase("dockerdb");
            _servers = database.GetCollection<Server>("servers");
        }
        
        public bool Create(CreateServerDTO serverDto)
        {
            var newServer = new Server
            {
                Ip = serverDto.Ip,
                Introduction = serverDto.Introduction,
                Endpoint = serverDto.Endpoint,
                Provider = serverDto.Provider
            };
            
            _servers.InsertOne(newServer);
            
            return true;
        }
        
        public bool Delete(DeleteServerDTO serverDto)
        {
            var theServer = _servers.Find(s => s.Id == serverDto.Id).FirstOrDefault();
            if (theServer.UserId != serverDto.UserId)
            {
                return false;
            }
            _servers.DeleteOne(s => s.Id == serverDto.Id);
            
            return true;
        }

        public List<Server> GetAll()
        {
            return _servers.Find(s => true).ToList();
        }
    }
}
using System;
using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ImageDTO;
using DockerMgr.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace DockerMgr.Services.impl
{
    public class ImageService : IImageService
    {
        private readonly IDockerClientPoolCollection _pools;
        private readonly IServerService _servers;
        private readonly IMongoCollection<ImagePullMsg> _pullMsgs;
        
        public ImageService(IConfiguration config, IDockerClientPoolCollection pools, IServerService servers)
        {
            _pools = pools;
            _servers = servers;
            var client = new MongoClient(config.GetConnectionString("dockerdb"));
            var database = client.GetDatabase("dockerdb");
            _pullMsgs = database.GetCollection<ImagePullMsg>("imageMsgs");
        }

        public IList<ImagesListResponse> GetAllImagesByIp(string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get();

            IList<ImagesListResponse> images = client.Images.ListImagesAsync(new ImagesListParameters()).Result;

            return images;
        }

        public ReturnGetAllImageByUserIdDTO GetAllImagesByUserId(string id)
        {
            var servers = _servers.GetAll(id);
            
            var images = new Dictionary<string, IList < ImagesListResponse >>();

            foreach (var server in servers)
            {
                var ip = server.Ip;
                var client = _pools.GetPoolByIp(ip).Get();
                images.Add(ip, client.Images.ListImagesAsync(new ImagesListParameters()).Result);
            }

            return new ReturnGetAllImageByUserIdDTO{Images = images};
        }
        
        public IList<ImageSearchResponse> SearchImages(string keyWord, string ip)
        {
            var client = _pools.GetPoolByIp(ip).Get();
            var r = client.Images.SearchImagesAsync(new ImagesSearchParameters
            {
                Term = keyWord
            }).Result;

            return r;
        }

        public ImageInspectResponse ImageDetail(string ip, string name)
        {
            var client = _pools.GetPoolByIp(ip).Get();
            var r = client.Images.InspectImageAsync(name).Result;

            return r;
        }

        public IList<IDictionary<string, string>> DeleteImage(string ip, string id)
        {
            var client = _pools.GetPoolByIp(ip).Get();
            var r = client.Images.DeleteImageAsync(id, new ImageDeleteParameters()).Result;

            return r;
        }

        public async void PullImage(string ip, string name, string tag, string guid)
        {
            try
            {
                var client = _pools.GetPoolByIp(ip).Get();

                var report = new Progress<JSONMessage>( msg =>
                {
                    var str = $"{msg.Status}|{msg.ProgressMessage}|{msg.ErrorMessage}";
                    Console.WriteLine( str );

                    var anotherMsg = new ImagePullMsg
                    {
                        UId = guid,
                        LastUpdateMsg = str,
                        Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
                    };
                    _pullMsgs.InsertOne(anotherMsg);
                    
                } );

                await client.Images.CreateImageAsync( new ImagesCreateParameters
                    {
                        FromImage = name + ":" + tag
                    },
                    new AuthConfig(),
                    report
                );
            
                var newMsg = new ImagePullMsg
                {
                    UId = guid,
                    LastUpdateMsg = "Finished",
                    Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
                };
                
                _pullMsgs.InsertOne(newMsg);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

        }

        public List<ImagePullMsg> PullDetail(string guid)
        {
            return _pullMsgs.Find(s => s.UId == guid).ToList();
        }
        
    }
}
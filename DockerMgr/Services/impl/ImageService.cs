using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Docker.DotNet.Models;
using DockerMgr.DTO.ImageDTO;

namespace DockerMgr.Services.impl
{
    public class ImageService : IImageService
    {
        private readonly IDockerClientPoolCollection _pools;
        private readonly IServerService _servers;
        
        public ImageService(IDockerClientPoolCollection pools, IServerService servers)
        {
            _pools = pools;
            _servers = servers;
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
        
    }
}
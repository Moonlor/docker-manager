using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ImageDTO;

namespace DockerMgr.Services
{
    public interface IImageService
    {
        IList<ImagesListResponse> GetAllImagesByIp(string ip);

        ReturnGetAllImageByUserIdDTO GetAllImagesByUserId(string id);

        IList<ImageSearchResponse> SearchImages(string keyWord, string ip);

        ImageInspectResponse ImageDetail(string ip, string name);
    }
}
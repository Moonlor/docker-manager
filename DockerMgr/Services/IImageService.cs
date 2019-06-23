using System.Collections.Generic;
using Docker.DotNet.Models;
using DockerMgr.DTO.ImageDTO;
using DockerMgr.Models;

namespace DockerMgr.Services
{
    public interface IImageService
    {
        IList<ImagesListResponse> GetAllImagesByIp(string ip);

        ReturnGetAllImageByUserIdDTO GetAllImagesByUserId(string id);

        IList<ImageSearchResponse> SearchImages(string keyWord, string ip);

        ImageInspectResponse ImageDetail(string ip, string name);

        IList<IDictionary<string, string>> DeleteImage(string ip, string id);

        void PullImage(string ip, string name, string tag, string guid);

        List<ImagePullMsg> PullDetail(string guid);
    }
}
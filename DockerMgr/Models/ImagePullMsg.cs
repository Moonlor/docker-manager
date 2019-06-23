using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DockerMgr.Models
{
    public class ImagePullMsg
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("UId")]
        public string UId { get; set; }

        [BsonElement("LastUpdateMsg")]
        public string LastUpdateMsg { get; set; }
        
        [BsonElement("Timestamp")]
        public long Timestamp { get; set; }
    }
}
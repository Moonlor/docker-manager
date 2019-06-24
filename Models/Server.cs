using System.Data;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Models
{
    public class Server
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Provider")]
        public string Provider { get; set; }

        [BsonElement("Ip")]
        public string Ip { get; set; }

        [BsonElement("Introduction")]
        public string Introduction { get; set; }

        [BsonElement("Endpoint")]
        public string Endpoint { get; set; }
        
        [BsonElement("UserId")]
        public string UserId { get; set; }
    }
}
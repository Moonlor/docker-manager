using NUnit.Framework;
using PWEncrypt;

namespace EncryptTest
{
    [TestFixture]
    public class EncryptTest
    {
        [Test]
        public void GetEqualEncryptedPWD()
        {
            string pwd1 = Encrypt.GetEncryptedPW("2233", "dinghow@test.com");
            string pwd2 = Encrypt.GetEncryptedPW("2233", "dinghow@test.com");
            Assert.AreEqual(pwd1, pwd2);
        }
    }
}
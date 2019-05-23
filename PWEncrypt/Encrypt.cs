using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace PWEncrypt
{
    public static class Encrypt
    {

        public static string GetEncryptedPW(string pwd, string email)
        {
            string password = pwd;
            byte[] salt = System.Text.Encoding.Default.GetBytes(email);
 
            // generate a 128-bit salt using a secure PRNG
//            byte[] salt = new byte[128 / 8];
//            using (var rng = RandomNumberGenerator.Create())
//            {
//                rng.GetBytes(salt);
//            }
//            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
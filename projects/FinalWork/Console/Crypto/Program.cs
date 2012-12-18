using System;
using System.Security.Cryptography;
using System.Text;

class RSACSPSample
{
    //Asymetric
    void Main()
    {
        try
        {
            UnicodeEncoding ByteConverter = new UnicodeEncoding();

            byte[] dataToEncrypt = ByteConverter.GetBytes("Data to Encrypt");
            byte[] encryptedData;
            byte[] decryptedData;

            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                encryptedData = RSAEncrypt(dataToEncrypt, RSA.ExportParameters(false));
                decryptedData = RSADecrypt(encryptedData, RSA.ExportParameters(true));
                
                Console.WriteLine("Decrypted plaintext: {0}", ByteConverter.GetString(decryptedData));
            }
        }
        catch (ArgumentNullException)
        {
            Console.WriteLine("Encryption failed.");
        }
    }

    static public byte[] RSAEncrypt(byte[] DataToEncrypt, RSAParameters RSAKeyInfo)
    {
        try
        {
            byte[] encryptedData;
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.ImportParameters(RSAKeyInfo);
                encryptedData = RSA.Encrypt(DataToEncrypt, false);
            }
            return encryptedData;
        }
        catch (CryptographicException e)
        {
            Console.WriteLine(e.Message);

            return null;
        }

    }

    static public byte[] RSADecrypt(byte[] DataToDecrypt, RSAParameters RSAKeyInfo)
    {
        try
        {
            byte[] decryptedData;
            
            using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
            {
                RSA.ImportParameters(RSAKeyInfo);
                decryptedData = RSA.Decrypt(DataToDecrypt,false);
            }
            return decryptedData;
        }
        catch (CryptographicException e)
        {
            Console.WriteLine(e.ToString());

            return null;
        }

    }
}
package com.mahedee;
import org.bouncycastle.bcpg.ArmoredOutputStream;
import org.bouncycastle.bcpg.HashAlgorithmTags;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openpgp.*;
import org.bouncycastle.openpgp.operator.PGPDigestCalculator;
import org.bouncycastle.openpgp.operator.jcajce.JcaPGPContentSignerBuilder;
import org.bouncycastle.openpgp.operator.jcajce.JcaPGPDigestCalculatorProviderBuilder;
import org.bouncycastle.openpgp.operator.jcajce.JcaPGPKeyPair;
import org.bouncycastle.openpgp.operator.jcajce.JcePBESecretKeyEncryptorBuilder;

import java.io.FileOutputStream;
import java.security.*;
import java.util.Date;

import java.io.FileWriter;
import java.io.IOException;

public class PGPKeyGenerator {

    // static {
    //     Security.addProvider(new BouncyCastleProvider());
    // }

    static {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
    }


    public static class PGPKeys {
        private String publicKey;
        private String privateKey;

        public PGPKeys(String publicKey, String privateKey) {
            this.publicKey = publicKey;
            this.privateKey = privateKey;
        }

        public String getPublicKey() {
            return publicKey;
        }

        public String getPrivateKey() {
            return privateKey;
        }
    }

   // public static void generateKeyPair(String identity, String passphrase) throws Exception {
    public static void generateKeyPair(String identity, String passphrase) throws Exception {      
        //KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA", "BC");
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA", BouncyCastleProvider.PROVIDER_NAME);
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();

        PGPDigestCalculator sha1Calc = new JcaPGPDigestCalculatorProviderBuilder().build().get(HashAlgorithmTags.SHA1);
        PGPKeyPair pgpKeyPair = new JcaPGPKeyPair(PGPPublicKey.RSA_GENERAL, keyPair, new Date());
 

        // Throws exception at run time
        PGPSecretKey secretKey = new PGPSecretKey(
                PGPSignature.DEFAULT_CERTIFICATION,
                pgpKeyPair,
                identity,
                sha1Calc,
                null,
                null,
                new JcaPGPContentSignerBuilder(pgpKeyPair.getPublicKey().getAlgorithm(), HashAlgorithmTags.SHA1),
                new JcePBESecretKeyEncryptorBuilder(PGPEncryptedData.CAST5, sha1Calc)
                .setProvider(BouncyCastleProvider.PROVIDER_NAME)        
                //.setProvider("BC")
                .build(passphrase.toCharArray())
        );

                ///* 

        //PGPPublicKey skey = secretKey.getPublicKey();

             try (FileOutputStream fos = new FileOutputStream("public_key.pgp");
             ArmoredOutputStream aos = new ArmoredOutputStream(fos)) {
            secretKey.getPublicKey().encode(aos);
        }

   
        try (FileOutputStream fos = new FileOutputStream("private_key.pgp");
             ArmoredOutputStream aos = new ArmoredOutputStream(fos)) {
            secretKey.encode(aos);
        }

      //*/
        System.out.println("Keys generated and saved to files.");
    }




    public static void writeKeysToFile(String publicKey, String privateKey) throws IOException {
        // Write public key to public_key.txt
        try (FileWriter publicKeyWriter = new FileWriter("public_key.pgp")) {
            publicKeyWriter.write(publicKey);
        }

        // Write private key to private_key.txt
        try (FileWriter privateKeyWriter = new FileWriter("private_key.pgp")) {
            privateKeyWriter.write(privateKey);
        }

        System.out.println("Public and Private keys saved to files.");
    }


    public static void main(String[] args) {
    
        // print current date time
        System.out.println("Current Date and Time " + new Date().toString());

        try
        {
            generateKeyPair("test@example.com", "strong-passphrase");
        }
        catch (Exception e)
        {
            System.out.println("Error generating key pair: " + e.getMessage());
        }
        System.out.println("Public Key and Private Key written to public_key.pgp and private_key.pgp.");
            
    }
}
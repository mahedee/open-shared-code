package com.mahedee;
import org.apache.log4j.Logger;
import org.apache.commons.io.IOUtils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openpgp.PGPEncryptedData;
import org.bouncycastle.openpgp.PGPEncryptedDataList;
import org.bouncycastle.openpgp.PGPException;
import org.bouncycastle.openpgp.PGPPrivateKey;
import org.bouncycastle.openpgp.PGPPublicKeyEncryptedData;
import org.bouncycastle.openpgp.PGPSecretKey;
import org.bouncycastle.openpgp.PGPSecretKeyRingCollection;
import org.bouncycastle.openpgp.PGPUtil;
import org.bouncycastle.openpgp.jcajce.JcaPGPObjectFactory;
import org.bouncycastle.openpgp.operator.jcajce.JcaKeyFingerprintCalculator;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.security.Security;
import java.util.Iterator;
import java.util.Objects;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;


public class PGPDecryptor {

    private static final Logger logger = Logger.getLogger(PGPDecryptor.class);

    static {
        // Add BouncyCastle to JVM
        if (Objects.isNull(Security.getProvider(BouncyCastleProvider.PROVIDER_NAME))) {
            Security.addProvider(new BouncyCastleProvider());
        }
    }

    private final PGPSecretKeyRingCollection pgpSecretKeyRingCollection;

    // Constructor without passcode
    public PGPDecryptor(InputStream privateKeyIn) throws IOException, PGPException {
        this.pgpSecretKeyRingCollection = new PGPSecretKeyRingCollection(
                PGPUtil.getDecoderStream(privateKeyIn),
                new JcaKeyFingerprintCalculator()
        );

        logger.info("Initialized PGPDecryptor with private key");
    }

    // Overloaded constructor to support key string input
    public PGPDecryptor(String privateKeyStr) throws IOException, PGPException {
        this(IOUtils.toInputStream(privateKeyStr, Charset.defaultCharset()));
    }

    // Method to find the secret key
    private PGPPrivateKey findSecretKey(long keyID) throws PGPException {
        PGPSecretKey pgpSecretKey = pgpSecretKeyRingCollection.getSecretKey(keyID);
        return pgpSecretKey == null ? null : pgpSecretKey.extractPrivateKey(null);
    }

    // Decrypt method
    public void decrypt(InputStream encryptedIn, OutputStream clearOut)
            throws PGPException, IOException {
        encryptedIn = PGPUtil.getDecoderStream(encryptedIn);
        JcaPGPObjectFactory pgpObjectFactory = new JcaPGPObjectFactory(encryptedIn);

        Object obj = pgpObjectFactory.nextObject();
        PGPEncryptedDataList pgpEncryptedDataList = (obj instanceof PGPEncryptedDataList)
                ? (PGPEncryptedDataList) obj
                : (PGPEncryptedDataList) pgpObjectFactory.nextObject();

        PGPPrivateKey pgpPrivateKey = null;
        PGPPublicKeyEncryptedData publicKeyEncryptedData = null;

        Iterator<PGPEncryptedData> encryptedDataItr = pgpEncryptedDataList.getEncryptedDataObjects();
        while (pgpPrivateKey == null && encryptedDataItr.hasNext()) {
            publicKeyEncryptedData = (PGPPublicKeyEncryptedData) encryptedDataItr.next();
            pgpPrivateKey = findSecretKey(publicKeyEncryptedData.getKeyID());
        }

        if (Objects.isNull(publicKeyEncryptedData)) {
            throw new PGPException("Could not generate PGPPublicKeyEncryptedData object");
        }

        if (pgpPrivateKey == null) {
            throw new PGPException("Could not extract private key");
        }

        CommonUtils.decrypt(clearOut, pgpPrivateKey, publicKeyEncryptedData);
    }

    // Overloaded decrypt method to handle byte arrays
    public byte[] decrypt(byte[] encryptedBytes) throws PGPException, IOException {
        ByteArrayInputStream encryptedIn = new ByteArrayInputStream(encryptedBytes);
        ByteArrayOutputStream clearOut = new ByteArrayOutputStream();
        decrypt(encryptedIn, clearOut);
        return clearOut.toByteArray();
    }

    public static void main(String[] args) {
        try {
            // Specify the file paths for the encrypted file and private key
            String encryptedFilePath = "encryptedtext.txt";
            String privateKeyFilePath = "private_key.pgp";
            String outputFilePath = "decryptedtext.txt";
            
            // Open file streams for the encrypted file and private key
            InputStream encryptedFileStream = new FileInputStream(encryptedFilePath);
            InputStream privateKeyStream = new FileInputStream(privateKeyFilePath);
            
            // Open an output stream where decrypted data will be written
            OutputStream decryptedOutputStream = new FileOutputStream(outputFilePath);
            
            // Initialize the PgpDecryptionUtil class with the private key input stream
            PGPDecryptor decryptionUtil = new PGPDecryptor(privateKeyStream);
            
            // Perform the decryption
            decryptionUtil.decrypt(encryptedFileStream, decryptedOutputStream);
            
            // Close the streams after the process is done
            encryptedFileStream.close();
            privateKeyStream.close();
            decryptedOutputStream.close();
            
            System.out.println("Decryption completed. Decrypted data written to " + outputFilePath);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("An error occurred during decryption: " + e.getMessage());
        }
    }
}


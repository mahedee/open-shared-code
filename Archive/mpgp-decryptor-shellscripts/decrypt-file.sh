#!/bin/bash

# Predefined directories (Windows paths or Unix paths)
SOURCE_PATH="//opt/app/source"
DESTINATION_PATH="//opt/app/dest"
PRIVATE_KEY_PATH="//opt/app/pgp"
PATH_FOR_BAD_FILES="//opt/app/bad"

#PASSPHRASE="strong-passphrase"

# JAR file which will be run
JARFILENAME="mpgpdecryptor-1.0-SNAPSHOT-jar-with-dependencies.jar"

# Print the provided directories
echo "Source Path: $SOURCE_PATH"
echo "Destination Path: $DESTINATION_PATH"
echo "PGP File Path: $PRIVATE_KEY_PATH"
echo "Bad files Path: $PATH_FOR_BAD_FILES"
#echo "Passphrase: $PASSPHRASE"

# Command to run jar
java -jar $JARFILENAME $SOURCE_PATH $DESTINATION_PATH $PRIVATE_KEY_PATH $PATH_FOR_BAD_FILES


# Further logic for file transfer, encryption, etc. can go here.

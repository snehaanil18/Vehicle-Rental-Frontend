"use client";
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILES = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files) {
      filename
      url
    }
  }
`;

const UploadFile = () => {
  const [files, setFiles] = useState<File[]>([]); // Array to hold selected files
  const [uploadFiles, { data, loading, error }] = useMutation(UPLOAD_FILES);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []; // Convert FileList to array
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]); // Append new files to the existing array
  };

  const handleUpload = () => {
    uploadFiles({ variables: { files } }); // Upload all selected files
  };

  const handleAddMoreFiles = () => {
    // This function can be used if you want to clear the input after adding files
    setFiles(prevFiles => [...prevFiles]); // Keep the previously selected files
  };

  if (loading) return <p>Uploading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleAddMoreFiles}>Add More</button> {/* Button to add more files */}

      {data && (
        <div>
          {data.uploadFiles.map((file: { filename: string; url: string }) => (
            <div key={file.filename}>
              <p>Filename: {file.filename}</p>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3>Selected Files:</h3>
        {files.map((file, index) => (
          <p key={index}>{file.name}</p> // Display the names of selected files
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
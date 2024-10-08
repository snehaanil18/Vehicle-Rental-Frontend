"use client";
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      url
    }
  }
`;

const UploadFile = () => {
    const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { data, loading, error }] = useMutation(UPLOAD_FILE);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleUpload = () => {
    uploadFile({ variables: { file } });
  };

  if (loading) return <p>Uploading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {data && (
        <div>
          <p>Filename: {data.uploadFile.filename}</p>
          <a href={data.uploadFile.url} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
import React, { useContext, useState } from "react";
import { APIContext } from "../helpers/APIContext";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { UploadFile } = useContext(APIContext);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const handleProcess = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      const response = await UploadFile(formData);
      console.log(response);
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ fontWeight: "600" }}>Upload your Excel/CSV file</h3>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Choose an Excel or CSV file
      </p>

      <label
        htmlFor="file-upload"
        style={{
          display: "block",
          padding: "1.5rem",
          border: "2px dashed #ccc",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          cursor: "pointer",
        }}
      >
        <div>Drag and drop file here</div>
        <div style={{ fontSize: "0.85rem", color: "#999" }}>
          Limit 200MB per file • XLSX, CSV
        </div>
        <button
          type="button"
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#e6eaf1",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Browse files
        </button>
        <input
          id="file-upload"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {files.length > 0 && (
        <div
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#fff",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            fontSize: "0.9rem",
          }}
        >
          <div>
            📄 <strong>{files[0].name}</strong>
            <div style={{ color: "#999", fontSize: "0.8rem" }}>
              {(files[0].size / 1024).toFixed(1)}KB
            </div>
          </div>
          <button
            onClick={handleRemove}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <button
        onClick={handleProcess}
        style={{
          marginTop: "1.5rem",
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Process File
      </button>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadId, setUploadId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploading(true);
    try {
      const res = await axios.post("https://image-backend-giso.onrender.com/upload", formData);//https://image-backend-k3uq.onrender.com
      setUploadId(res.data.id);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Ladataan..." : "Lataa kuva"}
      </button>

      {uploadId && (
        <div className="mt-4 text-green-700">
          Kuva ladattu! ID: <strong>{uploadId}</strong>
        </div>
      )}
    </div>
  );
}

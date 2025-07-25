import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../api/AuthContext";

export default function UploadResource() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await axios.get("/resources");
        setResources(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchResources();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.post("/resources", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Resource uploaded!");
      setTitle("");
      setFile(null);

      const res = await axios.get("/resources");
      setResources(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Upload Study Resource</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>File</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      <h3 style={{ marginTop: "2em" }}>Available Resources</h3>

      {resources.length === 0 ? (
        <p>No resources uploaded yet.</p>
      ) : (
        resources.map(resource => (
          <div key={resource._id} className="card resource-card">
            <h4>{resource.title}</h4>
            <p>Uploaded by: {resource.uploadedBy?.name || "Unknown"}</p>
            <a
              href={`http://localhost:5000${resource.fileUrl}`}
              download
              className="download-link"
            >
              Download
            </a>
          </div>
        ))
      )}
    </div>
  );
}


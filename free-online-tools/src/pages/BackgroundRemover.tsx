import React, { useState } from "react";

const BackgroundRemover: React.FC = () => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("removed-bg.png");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name.split(".")[0] + "-no-bg.png");

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeBackground = () => {
    alert(
      "Basic version ready. AI Background Removal will be added in upgrade."
    );
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>✂️ Background Remover</h1>

        <p>Remove image background easily.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" onChange={handleUpload} />

        {image && <img src={image} alt="preview" className="preview-image" />}

        <button className="action-btn" onClick={removeBackground}>
          Remove Background
        </button>
      </div>
    </div>
  );
};

export default BackgroundRemover;

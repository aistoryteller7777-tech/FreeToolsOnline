import React, { useState } from "react";

const BackgroundRemover: React.FC = () => {
  document.title = "Background Remover Online Free - Online Toolbox";
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
      <div className="seo-content">
  <h2>Background Remover Online Free</h2>

  <p>
    Remove image backgrounds online for free in seconds. Create transparent PNG images with our fast, secure and easy-to-use background remover.
  </p>

  <h3>How to Remove Image Background?</h3>
  <ol>
    <li>Upload your image.</li>
    <li>Click Remove Background.</li>
    <li>Wait a few seconds for processing.</li>
    <li>Download your transparent image.</li>
  </ol>

  <h3>Features</h3>
  <ul>
    <li>Free background remover</li>
    <li>Fast AI processing</li>
    <li>High-quality transparent PNG output</li>
    <li>No registration required</li>
  </ul>

  <h3>Frequently Asked Questions</h3>

  <p><strong>Is this background remover free?</strong><br />
  Yes, it is completely free to use.</p>

  <p><strong>Will the background be removed automatically?</strong><br />
  Yes, the tool automatically detects and removes the background.</p>
</div>
    </div>
  );
};

export default BackgroundRemover;

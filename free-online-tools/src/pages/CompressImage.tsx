import React, { useState } from "react";

const CompressImage: React.FC = () => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("image.jpg");
  const [quality, setQuality] = useState(0.6);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!image) {
      alert("Please upload image");

      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      let width = img.width;
      let height = img.height;

      const maxWidth = 1200;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;

        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);

      const link = document.createElement("a");

      link.download = `compressed-${fileName}`;

      link.href = canvas.toDataURL("image/jpeg", quality);

      link.click();
    };

    img.src = image;
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>📦 Compress Image</h1>

        <p>Reduce image size while keeping good quality.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" onChange={handleUpload} />

        {image && <img src={image} alt="preview" className="preview-image" />}

        <div className="quality-box">
          <label>Image Quality</label>

          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />

          <p>Quality: {Math.round(quality * 100)}%</p>
        </div>

        <button className="action-btn" onClick={compressImage}>
          Compress & Download
        </button>
      </div>
    </div>
  );
};

export default CompressImage;

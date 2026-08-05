import React, { useState } from "react";

const ResizeImage: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [fileName, setFileName] = useState("image.png");
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

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

  const resizeImage = () => {
    if (!image) {
      alert("Please upload image");
      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);

      const link = document.createElement("a");

      link.download = `resized-${fileName}`;

      link.href = canvas.toDataURL("image/png");

      link.click();
    };

    img.src = image;
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>🖼️ Resize Image</h1>

        <p>Resize your images quickly without losing quality.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" onChange={handleUpload} />

        {image && <img src={image} alt="preview" className="preview-image" />}

        <div className="input-box">
          <label>Width</label>

          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />

          <label>Height</label>

          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>

        <button className="action-btn" onClick={resizeImage}>
          Resize & Download
        </button>
      </div>
    </div>
  );
};

export default ResizeImage;

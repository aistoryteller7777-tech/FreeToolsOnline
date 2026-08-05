import React, { useState } from "react";

const ImageConverter: React.FC = () => {
  document.title = "Image Converter Online Free - Online Toolbox";
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("converted-image");
  const [format, setFormat] = useState("png");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name.split(".")[0]);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!image) {
      alert("Please upload image");

      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;

      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");

      link.download = `${fileName}.${format}`;

      link.href = canvas.toDataURL(`image/${format}`, 0.9);

      link.click();
    };

    img.src = image;
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>🔄 Image Converter</h1>

        <p>Convert your images into different formats easily.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" onChange={handleUpload} />

        {image && <img src={image} alt="preview" className="preview-image" />}

        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="png">PNG</option>

          <option value="jpeg">JPG</option>

          <option value="webp">WEBP</option>
        </select>

        <button className="action-btn" onClick={convertImage}>
          Convert & Download
        </button>
      </div>
      <div className="seo-content">
  <h2>Image Converter Online Free</h2>

  <p>
    Convert JPG, PNG, WebP and other image formats online for free. Fast, secure and easy image conversion directly in your browser.
  </p>

  <h3>How to Convert an Image?</h3>
  <ol>
    <li>Upload your image.</li>
    <li>Select the output format.</li>
    <li>Click Convert Image.</li>
    <li>Download the converted image.</li>
  </ol>

  <h3>Features</h3>
  <ul>
    <li>Free image converter</li>
    <li>Supports multiple image formats</li>
    <li>Fast conversion</li>
    <li>No registration required</li>
  </ul>

  <h3>Frequently Asked Questions</h3>

  <p><strong>Is this image converter free?</strong><br />
  Yes, it is completely free.</p>

  <p><strong>Which formats are supported?</strong><br />
  JPG, PNG, WebP and other popular image formats.</p>
</div>
    </div>
  );
};

export default ImageConverter;

import React, { useState } from "react";

const ResizeImage: React.FC = () => {
  document.title = "Resize Image Online Free - Online Toolbox";
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
      <div className="seo-content">
  <h2>Resize Image Online Free</h2>

  <p>
    Resize images online for free with our easy-to-use image resizing tool.
    Change image width and height quickly while maintaining good image quality.
    Our online image resizer works directly in your browser without installing
    any software.
  </p>

  <h3>How to Resize Image Online?</h3>

  <ol>
    <li>Upload your image using the upload button.</li>
    <li>Enter your required image width and height.</li>
    <li>Click on the Resize and Download button.</li>
    <li>Download your resized image instantly.</li>
  </ol>

  <h3>Features of Image Resizer</h3>

  <ul>
    <li>Free online image resizing tool</li>
    <li>Fast and simple image processing</li>
    <li>No registration required</li>
    <li>Works with popular image formats</li>
    <li>Maintains good image quality</li>
  </ul>

  <h3>Why Use Our Resize Image Tool?</h3>

  <p>
    Our image resizer helps you quickly adjust image dimensions for websites,
    social media, documents, and online forms. You can resize images easily
    without complicated editing software.
  </p>

  <h3>Frequently Asked Questions</h3>

  <p>
    <strong>Can I resize images online for free?</strong><br />
    Yes, you can resize images online for free using this tool.
  </p>

  <p>
    <strong>Which image formats are supported?</strong><br />
    This tool supports commonly used image formats like JPG and PNG.
  </p>

  <p>
    <strong>Will my image quality be reduced after resizing?</strong><br />
    The tool tries to maintain the best possible image quality after resizing.
  </p>
</div>
    </div>
  );
};

export default ResizeImage;

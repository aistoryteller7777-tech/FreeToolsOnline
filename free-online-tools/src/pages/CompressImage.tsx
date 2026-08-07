import React, { useState } from "react";

const CompressImage: React.FC = () => {
  document.title = "Compress Image Online Free - Online Toolbox";
  const [image, setImage] = useState("");

const [preview, setPreview] = useState("");

const [fileName, setFileName] = useState("");

const [outputName, setOutputName] = useState("");

const [imageWidth, setImageWidth] = useState(0);

const [imageHeight, setImageHeight] = useState(0);

const [unit, setUnit] = useState<"px" | "cm" | "mm">("px");

const [width, setWidth] = useState("");

const [height, setHeight] = useState("");

const [keepRatio, setKeepRatio] = useState(true);

const [targetKB, setTargetKB] = useState("100");

const [outputFormat, setOutputFormat] = useState("jpeg");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setFileName(file.name);

  setOutputName(file.name.replace(/\.[^/.]+$/, ""));

  const reader = new FileReader();

  reader.onload = (event) => {
    const result = event.target?.result as string;

    setImage(result);

    setPreview(result);

    const img = new Image();

    img.onload = () => {
      setImageWidth(img.width);

      setImageHeight(img.height);

      setWidth(String(img.width));

      setHeight(String(img.height));
    };

    img.src = result;
  };

  reader.readAsDataURL(file);
};


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
};

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>📦 Compress Image</h1>

        <p>Reduce image size while keeping good quality.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" onChange={handleUpload} />

        {preview && (
  <div className="preview-section">

    <img
      src={preview}
      alt="Preview"
      className="preview-image"
    />

    <div className="image-info">

      <div className="info-item">
        <span>📷 Width</span>
        <strong>{imageWidth}px</strong>
      </div>

      <div className="info-item">
        <span>📐 Height</span>
        <strong>{imageHeight}px</strong>
      </div>

      <div className="info-item">
        <span>📝 File</span>
        <strong>{fileName}</strong>
      </div>

    </div>

  </div>
)}

        <div className="resize-panel">

  <h3>Resize Settings</h3>

  <div className="unit-selector">

    <button
      className={unit === "px" ? "active-unit" : ""}
      onClick={() => setUnit("px")}
      type="button"
    >
      Pixel
    </button>

    <button
      className={unit === "cm" ? "active-unit" : ""}
      onClick={() => setUnit("cm")}
      type="button"
    >
      CM
    </button>

    <button
      className={unit === "mm" ? "active-unit" : ""}
      onClick={() => setUnit("mm")}
      type="button"
    >
      MM
    </button>

  </div>

  <div className="input-box">

    <div>

      <label>Width ({unit})</label>

      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />

    </div>

    <div>

      <label>Height ({unit})</label>

      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

    </div>

  </div>

  <label className="ratio-box">

    <input
      type="checkbox"
      checked={keepRatio}
      onChange={(e) => setKeepRatio(e.target.checked)}
    />

    Maintain Aspect Ratio

  </label>

  <div style={{ marginTop: "20px" }}>

    <label>Target File Size (KB)</label>

    <input
      type="number"
      placeholder="100"
      value={targetKB}
      onChange={(e) => setTargetKB(e.target.value)}
    />

  </div>

</div>

        <div className="output-panel">

  <h3>Output Settings</h3>

  <div style={{ marginBottom: "20px" }}>

    <label>Output Format</label>

    <select
      value={outputFormat}
      onChange={(e) => setOutputFormat(e.target.value)}
    >
      <option value="jpeg">JPG</option>

      <option value="png">PNG</option>

      <option value="webp">WEBP</option>

    </select>

  </div>

  <div style={{ marginBottom: "20px" }}>

    <label>Rename File</label>

    <input
      type="text"
      value={outputName}
      onChange={(e) => setOutputName(e.target.value)}
      placeholder="Enter File Name"
    />

  </div>

  <button
    className="action-btn"
    onClick={compressImage}
  >
    Reduce & Compress Image
  </button>

</div>
      </div>
      <div className="seo-content">
  <h2>Compress Image Online Free</h2>

  <p>
    Compress JPG, PNG and WebP images online for free. Reduce image file size
    without noticeable quality loss using our fast and secure image compressor.
  </p>

  <h3>How to Compress an Image?</h3>
  <ol>
    <li>Upload your image.</li>
    <li>Select the compression level.</li>
    <li>Click Compress Image.</li>
    <li>Download the compressed image.</li>
  </ol>

  <h3>Features</h3>
  <ul>
    <li>Free image compression</li>
    <li>Fast processing</li>
    <li>No registration required</li>
    <li>Supports JPG, PNG and WebP</li>
  </ul>

  <h3>Frequently Asked Questions</h3>

  <p><strong>Is this tool free?</strong><br />
  Yes, it is completely free.</p>

  <p><strong>Will image quality remain good?</strong><br />
  Yes, the tool is designed to reduce file size while keeping good visual quality.</p>
</div>
    </div>
  );
};

export default CompressImage;

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
  const convertPixels = (
  value: number,
  from: "px" | "cm" | "mm",
  to: "px" | "cm" | "mm"
) => {
  const DPI = 96;

  let px = value;

  if (from === "cm") px = (value / 2.54) * DPI;
  if (from === "mm") px = (value / 25.4) * DPI;

  if (to === "px") return Math.round(px);
  if (to === "cm") return Number(((px / DPI) * 2.54).toFixed(2));

  return Number(((px / DPI) * 25.4).toFixed(2));
};

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


  const compressImage = () => {
  if (!image) {
    alert("Please upload image");
    return;
  }

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");

    let newWidth = Number(width) || img.width;
    let newHeight = Number(height) || img.height;

    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      img,
      0,
      0,
      newWidth,
      newHeight
    );

    let quality = 0.9;

    const targetBytes =
      Number(targetKB) * 1024;

    let compressed = canvas.toDataURL(
      `image/${outputFormat}`,
      quality
    );

    while (
      compressed.length > targetBytes &&
      quality > 0.1
    ) {
      quality -= 0.05;

      compressed = canvas.toDataURL(
        `image/${outputFormat}`,
        quality
      );
    }

    const link = document.createElement("a");

    const finalName =
  outputName.trim() !== ""
    ? outputName.trim()
    : "compressed-image";

link.download = `${finalName}.${outputFormat}`;

    link.href = compressed;

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
  onClick={() => {
    setWidth(
      String(
        convertPixels(Number(width), unit, "px")
      )
    );

    setHeight(
      String(
        convertPixels(Number(height), unit, "px")
      )
    );

    setUnit("px");
  }}
  type="button"
>
  Pixel
</button>

    <button
      className={unit === "cm" ? "active-unit" : ""}
      onClick={() => {
  setWidth(
    String(
      convertPixels(Number(width), unit, "cm")
    )
  );

  setHeight(
    String(
      convertPixels(Number(height), unit, "cm")
    )
  );

  setUnit("cm");
}}
      type="button"
    >
      CM
    </button>

    <button
      className={unit === "mm" ? "active-unit" : ""}
      onClick={() => {
  setWidth(
    String(
      convertPixels(Number(width), unit, "mm")
    )
  );

  setHeight(
    String(
      convertPixels(Number(height), unit, "mm")
    )
  );

  setUnit("mm");
}}
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
  onChange={(e) => {
    const newWidth = e.target.value;

    setWidth(newWidth);

    if (keepRatio && imageWidth && imageHeight) {
      const newHeight =
        (Number(newWidth) * imageHeight) /
        imageWidth;

      setHeight(
        String(Math.round(newHeight))
      );
    }
  }}
/>

    </div>

    <div>

      <label>Height ({unit})</label>

     <input
  type="number"
  value={height}
  onChange={(e) => {
    const newHeight = e.target.value;

    setHeight(newHeight);

    if (keepRatio && imageWidth && imageHeight) {
      const newWidth =
        (Number(newHeight) * imageWidth) /
        imageHeight;

      setWidth(
        String(Math.round(newWidth))
      );
    }
  }}
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

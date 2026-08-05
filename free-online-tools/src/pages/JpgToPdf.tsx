import React, { useState } from "react";
import { jsPDF } from "jspdf";

const JpgToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles(Array.from(e.target.files));
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      alert("Please select images");

      return;
    }

    setLoading(true);

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const imageData = await new Promise<string>((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.readAsDataURL(files[i]);
      });

      const img = await new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();

        image.onload = () => {
          resolve(image);
        };

        image.src = imageData;
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      const height = (img.height * pageWidth) / img.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,

        "JPEG",

        0,

        0,

        pageWidth,

        height
      );
    }

    pdf.save("converted-images.pdf");

    setLoading(false);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>📄 JPG To PDF</h1>

        <p>Convert your images into PDF quickly and easily.</p>
      </div>

      <div className="tool-card">
        <input type="file" accept="image/*" multiple onChange={handleUpload} />

        {files.length > 0 && (
          <div className="file-list">
            <h3>Selected Images</h3>

            <p>{files.length} image(s) selected</p>

            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="action-btn"
          onClick={convertToPdf}
          disabled={loading}
        >
          {loading ? "Creating PDF..." : "Convert To PDF"}
        </button>
      </div>
    </div>
  );
};

export default JpgToPdf;

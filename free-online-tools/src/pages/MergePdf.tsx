import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const MergePdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    setFiles(Array.from(selectedFiles));
  };

  const mergePdf = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files");

      return;
    }

    try {
      setLoading(true);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();

        const pdf = await PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const finalPdf = await mergedPdf.save();

      const blob = new Blob([finalPdf], {
        type: "application/pdf",
      });

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = "merged-file.pdf";

      link.click();

      setLoading(false);
    } catch (error) {
      setLoading(false);

      alert("Error merging PDF files");
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>📑 Merge PDF</h1>

        <p>Combine multiple PDF files into one PDF.</p>
      </div>

      <div className="tool-card">
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleUpload}
        />

        {files.length > 0 && (
          <div className="file-list">
            <h3>Selected PDFs</h3>

            <p>{files.length} file(s) selected</p>

            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="action-btn" onClick={mergePdf} disabled={loading}>
          {loading ? "Merging..." : "Merge PDF & Download"}
        </button>
      </div>
    </div>
  );
};

export default MergePdf;

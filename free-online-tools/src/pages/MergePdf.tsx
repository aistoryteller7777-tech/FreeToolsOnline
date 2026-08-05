import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const MergePdf: React.FC = () => {
  document.title = "Merge PDF Online Free - Online Toolbox";
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
      <div className="seo-content">
  <h2>Merge PDF Online Free</h2>

  <p>
    Merge multiple PDF files into one document online for free. Combine PDF files quickly, securely and without installing any software.
  </p>

  <h3>How to Merge PDF Files?</h3>
  <ol>
    <li>Upload your PDF files.</li>
    <li>Arrange them in the desired order.</li>
    <li>Click Merge PDF.</li>
    <li>Download the merged PDF file.</li>
  </ol>

  <h3>Features</h3>
  <ul>
    <li>Free PDF merger</li>
    <li>Fast processing</li>
    <li>Secure file handling</li>
    <li>No registration required</li>
  </ul>

  <h3>Frequently Asked Questions</h3>

  <p><strong>Can I merge multiple PDF files?</strong><br />
  Yes, you can merge multiple PDF files into one document.</p>

  <p><strong>Is this PDF merge tool free?</strong><br />
  Yes, it is completely free to use.</p>
</div>
    </div>
  );
};

export default MergePdf;

import React, { useState } from "react";
import { jsPDF } from "jspdf";

const JpgToPdf: React.FC = () => {

  document.title = "JPG To PDF Converter Online Free - Online Toolbox";


  const [files, setFiles] = useState<File[]>([]);

  const [pdfName, setPdfName] = useState("converted-images");

  const [loading, setLoading] = useState(false);
  const [downloadName, setDownloadName] = useState("my-images-pdf");
const [pageSize, setPageSize] = useState("a4");
    const [previews, setPreviews] = useState<string[]>([]);
  const [fileName, setFileName] = useState("converted-pdf");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [quality, setQuality] = useState(0.9);
  const [margin, setMargin] = useState(10);
  const removeImage = (index: number) => {

  const newFiles = files.filter(
    (_, i) => i !== index
  );

  const newPreviews = previews.filter(
    (_, i) => i !== index
  );

  setFiles(newFiles);

  setPreviews(newPreviews);

};


const clearAllImages = () => {

  setFiles([]);

  setPreviews([]);

};



  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files;

  if (!selectedFiles) return;

  const imageFiles = Array.from(selectedFiles);

  setFiles(imageFiles);

  const names = imageFiles.map((file) => file.name);

  setFileName(names.join(", "));

  const readers = imageFiles.map((file) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then((results) => {
    setPreviews(results);
  });
};



  return (

    <div className="tool-page">


      <div className="tool-header">

        <h1>
          📄 JPG To PDF Converter
        </h1>


        <p>
          Convert images into professional PDF files with full control.
        </p>

      </div>



      <div className="tool-card">


        <input

          type="file"

          accept="image/*"

          multiple

          onChange={handleUpload}

        />
        <div className="pdf-settings">

  <h3>⚙️ PDF Settings</h3>

  <label>
    PDF File Name
  </label>

  <input
    type="text"
    value={downloadName}
    onChange={(e) => setDownloadName(e.target.value)}
    placeholder="Enter PDF name"
  />


  <label>
    Page Size
  </label>

  <select
    value={pageSize}
    onChange={(e) => setPageSize(e.target.value)}
  >
    <option value="a4">A4</option>
    <option value="letter">Letter</option>
    <option value="a3">A3</option>
  </select>


  <label>
    Orientation
  </label>

  <select
    value={orientation}
    onChange={(e) =>
      setOrientation(
        e.target.value as "portrait" | "landscape"
      )
    }
  >
    <option value="portrait">
      Portrait
    </option>

    <option value="landscape">
      Landscape
    </option>

  </select>


  <label>
    Image Quality
  </label>

  <input
    type="range"
    min="0.3"
    max="1"
    step="0.1"
    value={quality}
    onChange={(e) =>
      setQuality(Number(e.target.value))
    }
  />


  <label>
    Margin: {margin}px
  </label>

  <input
    type="range"
    min="0"
    max="50"
    value={margin}
    onChange={(e) =>
      setMargin(Number(e.target.value))
    }
  />

</div>



        {files.length > 0 && (

          <div className="file-list">

            <h3>
              Selected Images
            </h3>


            <p>
              {files.length} image(s) selected
            </p>


            <ul>

              {files.map((file,index)=>(

                <li key={index}>
                  {file.name}
                </li>

              ))}

            </ul>


          </div>

        )}



        {previews.length > 0 && (

          <div className="preview-section">

            {previews.map((img,index)=>(

              <img

                key={index}

                src={img}

                className="preview-image"

                alt="preview"

              />

            ))}

          </div>

        )}



      </div>


    </div>

  );


};


export default JpgToPdf;

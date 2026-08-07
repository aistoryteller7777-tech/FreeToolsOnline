import React, { useState } from "react";
import { jsPDF } from "jspdf";

const JpgToPdf: React.FC = () => {

  document.title = "JPG To PDF Converter Online Free - Online Toolbox";


  const [files, setFiles] = useState<File[]>([]);

  const [previews, setPreviews] = useState<string[]>([]);

  const [pdfName, setPdfName] = useState("converted-images");

  const [pageSize, setPageSize] = useState("a4");

  const [orientation, setOrientation] = useState<
    "portrait" | "landscape"
  >("portrait");


  const [quality, setQuality] = useState(0.9);

  const [loading, setLoading] = useState(false);



  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFiles = e.target.files;


    if (!selectedFiles) return;


    const imageFiles = Array.from(selectedFiles);


    setFiles(imageFiles);



    const previewList = imageFiles.map((file) =>
      URL.createObjectURL(file)
    );


    setPreviews(previewList);

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

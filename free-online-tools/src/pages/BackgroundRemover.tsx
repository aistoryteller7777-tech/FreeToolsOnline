import React, { useState } from "react";

const BackgroundRemover: React.FC = () => {
  document.title = "Background Remover Online Free - Online Toolbox";

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };


  const removeBackground = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);

    try {

      const formData = new FormData();

      // Image API को भेजना
      formData.append("image", image);


      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) {
        throw new Error("API failed");
      }


      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      setResult(url);


    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong, please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="tool-page">

      <div className="tool-header">

        <h1>✂️ Background Remover</h1>

        <p>
          Remove image background automatically using AI.
        </p>

      </div>


      <div className="tool-card">


        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />


        {preview && (

          <div>

            <h3>Original Image</h3>

            <img
              src={preview}
              alt="Original"
              className="preview-image"
            />

          </div>

        )}



        <button
          className="action-btn"
          onClick={removeBackground}
          disabled={loading}
        >

          {loading
            ? "Removing..."
            : "Remove Background"}

        </button>



        {result && (

          <div>

            <h3>Removed Background</h3>


            <img
              src={result}
              alt="Result"
              className="preview-image"
            />


            <br />


            <a
              href={result}
              download="removed-bg.png"
              className="action-btn"
            >
              Download PNG
            </a>


          </div>

        )}


      </div>



      <div className="seo-content">

        <h2>
          Background Remover Online Free
        </h2>


        <p>
          Remove image background online and
          create transparent PNG images easily.
        </p>


        <h3>
          How to use?
        </h3>


        <ol>

          <li>
            Upload your image.
          </li>

          <li>
            Click Remove Background.
          </li>

          <li>
            Download transparent PNG.
          </li>

        </ol>


      </div>


    </div>

  );
};


export default BackgroundRemover;

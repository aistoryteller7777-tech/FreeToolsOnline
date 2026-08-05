import React, { useState } from "react";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

import ResizeImage from "./pages/ResizeImage";
import CompressImage from "./pages/CompressImage";
import JpgToPdf from "./pages/JpgToPdf";
import ImageConverter from "./pages/ImageConverter";
import BackgroundRemover from "./pages/BackgroundRemover";
import MergePdf from "./pages/MergePdf";

import "./styles.css";

type Page =
  | "home"
  | "resize"
  | "compress"
  | "jpgpdf"
  | "converter"
  | "background"
  | "mergepdf"
  | "about"
  | "privacy";

function App() {
  const [page, setPage] = useState<Page>("home");

  const goHome = () => {
    setPage("home");
  };

  if (page === "resize") {
    return (
      <div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <ResizeImage />
      </div>
    );
  }

  if (page === "compress") {
    return (
      <div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <CompressImage />
      </div>
    );
  }

  if (page === "jpgpdf") {
    return (
      <div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <JpgToPdf />
      </div>
    );
  }

  if (page === "converter") {
    return (
      <div>
        <div className="tool-grid">
          <div className="tool-card">Resize Image वाला कार्ड</div>

          <div className="tool-card">Compress Image वाला कार्ड</div>

          <div className="tool-card">JPG To PDF वाला कार्ड</div>
        </div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <ImageConverter />
      </div>
    );
  }
  if (page === "background") {
    return (
      <div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <BackgroundRemover />
      </div>
    );
  }
  if (page === "mergepdf") {
    return (
      <div>
        <button className="back-btn" onClick={goHome}>
          ← Back To Home
        </button>

        <MergePdf />
      </div>
    );
  }
  if (page === "about") {
  return (
    <div>
      <button className="back-btn" onClick={goHome}>
        ← Back To Home
      </button>

      <About />
    </div>
  );
}
  if (page === "privacy") {
  return (
    <div>
      <button className="back-btn" onClick={goHome}>
        ← Back To Home
      </button>

      <Privacy />
    </div>
  );
}
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-text">
          <h1>
            All Online Tools
            <br />
            You Need In One Place
          </h1>

          <p>
            Resize images, compress files, convert JPG to PDF and more. Fast,
            free and secure tools directly in your browser.
          </p>

          <button className="main-btn" onClick={() => setPage("resize")}>
            Explore Tools
          </button>
        </div>

        <div className="hero-image">
          <div className="image-box">🛠️</div>
        </div>
      </section>

      <section className="tools-section">
        <h2>Popular Tools</h2>

        <div className="tool-grid">
          <div className="tool-card">
            <div className="icon">🖼️</div>

            <h3>Resize Image</h3>

            <p>Change image width and height easily.</p>

            <button onClick={() => setPage("resize")}>Open Tool</button>
          </div>

          <div className="tool-card">
            <div className="icon">📦</div>

            <h3>Compress Image</h3>

            <p>Reduce image size with quality.</p>

            <button onClick={() => setPage("compress")}>Open Tool</button>
          </div>

          <div className="tool-card">
            <div className="icon">📄</div>

            <h3>JPG To PDF</h3>

            <p>Convert images into PDF quickly.</p>

            <button onClick={() => setPage("jpgpdf")}>Open Tool</button>
          </div>
          <div className="tool-card">
            <div className="icon">🔄</div>

            <h3>Image Converter</h3>

            <p>Convert JPG, PNG and WEBP images easily.</p>

            <button onClick={() => setPage("converter")}>Open Tool</button>
          </div>
        </div>
        <div className="tool-card">
          <div className="icon">✂️</div>

          <h3>Background Remover</h3>

          <p>Remove image background easily.</p>

          <button onClick={() => setPage("background")}>Open Tool</button>
        </div>
        <div className="tool-card">
          <div className="icon">📑</div>

          <h3>Merge PDF</h3>

          <p>Combine multiple PDF files into one.</p>

          <button onClick={() => setPage("mergepdf")}>Open Tool</button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="feature-grid">
          <div>
            🔒
            <h3>Secure</h3>
            <p>Your files stay private.</p>
          </div>

          <div>
            ⚡<h3>Fast</h3>
            <p>Quick browser processing.</p>
          </div>

          <div>
            🌐
            <h3>Online</h3>
            <p>No installation required.</p>
          </div>
        </div>
      </section>

      <footer>
  <h3>Free Online Tools</h3>
  <p>Simple tools for everyone.</p>

  <div className="footer-links">
    <button onClick={() => setPage("about")}>About Us</button>
    <button onClick={() => setPage("privacy")}>Privacy Policy</button>
  </div>

  <p style={{ marginTop: "15px", fontSize: "14px" }}>
    © 2026 Online Toolbox. All Rights Reserved.
  </p>
</footer>
    </div>
  );
}

export default App;

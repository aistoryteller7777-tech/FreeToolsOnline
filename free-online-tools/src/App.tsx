import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Contact from "./pages/Contact";

import ResizeImage from "./pages/ResizeImage";
import CompressImage from "./pages/CompressImage";
import JpgToPdf from "./pages/JpgToPdf";
import ImageConverter from "./pages/ImageConverter";
import BackgroundRemover from "./pages/BackgroundRemover";
import MergePdf from "./pages/MergePdf";

import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/resize-image" element={<ResizeImage />} />

      <Route path="/compress-image" element={<CompressImage />} />

      <Route path="/jpg-to-pdf" element={<JpgToPdf />} />

      <Route path="/image-converter" element={<ImageConverter />} />

      <Route
        path="/background-remover"
        element={<BackgroundRemover />}
      />

      <Route path="/merge-pdf" element={<MergePdf />} />

      <Route path="/about" element={<About />} />

      <Route path="/privacy" element={<Privacy />} />

      <Route path="/terms" element={<Terms />} />

      <Route path="/disclaimer" element={<Disclaimer />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

import React from "react";

function About() {

  document.title = "About Us - Online Toolbox";

  return (
    <div className="tool">
      <h1>About Online Toolbox</h1>

      <p>
        Online Toolbox is a free online platform that provides easy-to-use image
        and PDF tools. Our goal is to help users complete everyday tasks quickly
        without installing any software.
      </p>

      <h2>Our Tools</h2>

      <ul>
        <li>Resize Image</li>
        <li>Compress Image</li>
        <li>Image Converter</li>
        <li>JPG to PDF</li>
        <li>Merge PDF</li>
        <li>Background Remover</li>
      </ul>

      <p>
        We are continuously adding new online tools to make file editing and
        document management simple, fast and secure.
      </p>
    </div>
  );
}

export default About;

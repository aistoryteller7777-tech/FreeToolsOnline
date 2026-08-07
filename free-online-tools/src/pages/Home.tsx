import { Link } from "react-router-dom";

function Home() {
  document.title = "Free Online Image & PDF Tools - Online Toolbox";
  const imageTools = [
    {
      name: "JPG to PDF",
      path: "/jpg-to-pdf",
      icon: "📄",
      description: "Convert JPG or PNG images into PDF.",
    },
    {
      name: "Resize Image",
      path: "/resize-image",
      icon: "📏",
      description: "Resize image by width and height.",
    },
    {
      name: "Compress Image",
      path: "/compress-image",
      icon: "🗜️",
      description: "Reduce image size without losing much quality.",
    },
  ];

  return (
    <div>
      <section className="hero">
        <h1>Free Online Tools</h1>

        <p>All Image & PDF Tools in One Place</p>

        <input
          className="search"
          type="text"
          placeholder="Search any tool..."
        />
      </section>

      <section className="section">
        <h2>Image Tools</h2>

        <div className="grid">
          {imageTools.map((tool) => (
            <div className="card" key={tool.name}>
              <h3>
                {tool.icon} {tool.name}
              </h3>

              <p>{tool.description}</p>

              <Link to={tool.path}>
                <button>Open Tool</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
  <h2>PDF Tools</h2>

  <div className="grid">
    <div className="card">
      <h3>📚 Merge PDF</h3>

      <p>Combine multiple PDF files into one PDF.</p>

      <Link to="/merge-pdf">
        <button>Open Tool</button>
      </Link>
    </div>

    <div className="card">
      <h3>✂️ Split PDF</h3>

      <p>Split PDF files into separate documents.</p>

      <button disabled>Coming Soon</button>
    </div>
  </div>
</section>

<section className="section">
  <h2>AI Tools</h2>

  <div className="grid">
    <div className="card">
      <h3>✨ Background Remover</h3>

      <p>Remove image backgrounds automatically using AI.</p>

      <Link to="/background-remover">
        <button>Open Tool</button>
      </Link>
    </div>
  </div>
</section>

      <footer className="footer">
        © 2026 Free Online Tools. All Rights Reserved.
      </footer>
      <div className="seo-content">
  <h2>Free Online Image & PDF Tools</h2>

  <p>
    Online Toolbox provides free online tools to resize images, compress images,
    convert JPG to PDF, merge PDF files, convert image formats, and remove image
    backgrounds. All tools work directly in your browser without installing any software.
  </p>

  <h3>Popular Online Tools</h3>

  <ul>
    <li>Resize Image Online</li>
    <li>Compress Image Online</li>
    <li>JPG to PDF Converter</li>
    <li>Merge PDF Files</li>
    <li>Image Converter</li>
    <li>Background Remover</li>
  </ul>

  <h3>Why Choose Online Toolbox?</h3>

  <p>
    Our tools are free, fast, secure and easy to use. You don't need to create
    an account or install any software. Simply upload your file, process it and
    download the result instantly.
  </p>
</div>
    </div>
  );
}

export default Home;

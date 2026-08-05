import { Link } from "react-router-dom";

function Home() {
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
            <p>Coming Soon</p>
            <button disabled>Coming Soon</button>
          </div>

          <div className="card">
            <h3>✂️ Split PDF</h3>
            <p>Coming Soon</p>
            <button disabled>Coming Soon</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>AI Tools</h2>

        <div className="grid">
          <div className="card">
            <h3>✨ Background Remover</h3>
            <p>Coming Soon</p>
            <button disabled>Coming Soon</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2026 Free Online Tools. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;

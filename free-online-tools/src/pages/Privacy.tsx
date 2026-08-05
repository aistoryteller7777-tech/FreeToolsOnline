import React from "react";

function Privacy() {

  document.title = "Privacy Policy - Online Toolbox";

  return (
    <div className="tool">
      <h1>Privacy Policy</h1>

      <p>
        Online Toolbox respects your privacy. We do not permanently store your
        uploaded files. Files are processed only to provide the requested tool
        functionality.
      </p>

      <h2>Information We Collect</h2>

      <p>
        We may collect basic anonymous usage information to improve our website.
      </p>

      <h2>File Privacy</h2>

      <p>
        Your uploaded files are processed securely and are not shared with third
        parties.
      </p>

      <h2>Contact</h2>

      <p>
        If you have any questions regarding this Privacy Policy, please contact us.
      </p>
    </div>
  );
}

export default Privacy;

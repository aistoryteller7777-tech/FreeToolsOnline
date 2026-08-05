import React from "react";

function Disclaimer() {

  document.title = "Disclaimer - Online Toolbox";

  return (
    <div className="tool">
      <h1>Disclaimer</h1>

      <p>
        The tools available on Online Toolbox are provided for general
        informational and productivity purposes only.
      </p>

      <h2>No Warranty</h2>

      <p>
        We do not guarantee that our tools will always be error-free,
        uninterrupted, or suitable for every purpose.
      </p>

      <h2>Use at Your Own Risk</h2>

      <p>
        You are responsible for verifying your files before using or sharing
        them. We are not liable for any loss or damage resulting from the use
        of this website.
      </p>
    </div>
  );
}

export default Disclaimer;

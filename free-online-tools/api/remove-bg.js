const formidable = require("formidable");
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const form = formidable({});

    const [fields, files] = await form.parse(req);

    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    const imageBuffer = fs.readFileSync(imageFile.filepath);

    const apiForm = new FormData();

    apiForm.append(
      "image_file",
      new Blob([imageBuffer]),
      imageFile.originalFilename
    );

    apiForm.append("size", "auto");

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        },
        body: apiForm,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(response.status).json({
        error: errorText,
      });
    }

    const result = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");

    return res.status(200).send(Buffer.from(result));

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Background removal failed",
    });
  }
}

import formidable from "formidable";
import fs from "fs";

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

    const form = formidable({
      multiples: false,
    });


    const [fields, files] = await form.parse(req);


    const imageFile = files.image;


    if (!imageFile) {
      return res.status(400).json({
        error: "Image not given",
      });
    }


    const filePath = imageFile[0].filepath;


    const formData = new FormData();


    formData.append(
      "image_file",
      new Blob([
        fs.readFileSync(filePath)
      ]),
      imageFile[0].originalFilename
    );


    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        },
        body: formData,
      }
    );


    if (!response.ok) {

      const error = await response.text();

      console.log(error);

      return res.status(response.status).json({
        error,
      });

    }


    const buffer = Buffer.from(
      await response.arrayBuffer()
    );


    res.setHeader(
      "Content-Type",
      "image/png"
    );


    res.status(200).send(buffer);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });

  }
}

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
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const body = Buffer.concat(chunks);

    const contentType = req.headers["content-type"];

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
          "Content-Type": contentType,
        },
        body: body,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(response.status).json({
        error: errorText,
      });
    }

    const image = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");

    return res.status(200).send(Buffer.from(image));

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Background removal failed",
    });
  }
}

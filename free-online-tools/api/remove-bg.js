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

    const buffer = Buffer.concat(chunks);

    const contentType = req.headers["content-type"];

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
          "Content-Type": contentType,
        },
        body: buffer,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.log(errorText);

      return res.status(response.status).json({
        error: errorText,
      });
    }

    const result = await response.arrayBuffer();

    res.setHeader(
      "Content-Type",
      "image/png"
    );

    res.status(200).send(
      Buffer.from(result)
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
}

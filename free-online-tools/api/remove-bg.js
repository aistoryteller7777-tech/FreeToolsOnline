export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const apiForm = new FormData();
    apiForm.append("image_file", imageFile);
    apiForm.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      body: apiForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: errorText,
      });
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=removed-bg.png"
    );

    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Background removal failed",
    });
  }
}

export default async function handler(req, res) {
  // Enable CORS so it works from any domain (GitHub Pages, Vercel, local)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.RESCUE_GROUPS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server" });
  }

  const { path, ...queryParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing 'path' query parameter" });
  }

  const baseUrl = "https://api.rescuegroups.org/v5";
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`RescueGroups API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: err.message || "Failed to fetch data" });
  }
}
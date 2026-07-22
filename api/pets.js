import https from 'https';

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

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing 'path' query parameter" });
  }

  const baseUrl = "https://api.rescuegroups.org/v5";
  const fullUrl = `${baseUrl}${path}`;

  try {
    const data = await httpsRequest(fullUrl, apiKey);
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: err.message || "Failed to fetch data" });
  }
}

/**
 * Make an HTTPS request using Node's built-in https module
 * (more reliable than fetch in some Vercel environments)
 */
function httpsRequest(url, apiKey) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': apiKey,
      },
      // Timeout after 15 seconds
      timeout: 15000,
    };

    const req = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`RescueGroups API Error: ${response.statusCode} ${response.statusMessage}`));
          return;
        }

        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Failed to parse API response: ${e.message}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Request failed: ${err.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    req.end();
  });
}

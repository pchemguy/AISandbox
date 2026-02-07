const http = require("http");

const PORT = process.env.PORT || 3000;
const scores = [];

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function handleOptions(res) {
  res.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end();
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "OPTIONS") {
    handleOptions(res);
    return;
  }

  if (method === "GET" && url === "/leaderboard") {
    const topScores = [...scores]
      .sort((a, b) => b - a)
      .slice(0, 10);
    sendJson(res, 200, { scores: topScores });
    return;
  }

  if (method === "POST" && url === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const score = Number(parsed.score);
        if (!Number.isFinite(score)) {
          sendJson(res, 400, { error: "Score must be a number." });
          return;
        }
        scores.push(score);
        sendJson(res, 201, { status: "ok" });
      } catch (error) {
        sendJson(res, 400, { error: "Invalid JSON." });
      }
    });
    return;
  }

  sendJson(res, 404, { error: "Not found." });
});

server.listen(PORT, () => {
  console.log(`Bug Busters backend running on http://localhost:${PORT}`);
});

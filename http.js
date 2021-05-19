const http = require("http");
const fs = require("fs");
const HomeFile = fs.readFileSync("temp.html", "utf-8");
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url == "/") {
    res.writeHead(404, { "Content-type": "text/html" });
    res.write(HomeFile);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.write("<h1>404 not found</h1>");
  }
  res.end();
});
const port = "8808";
const hostname = "127.0.0.1";
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

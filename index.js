const http = require("http");
const fs = require("fs");
const requests = require("requests");

const HomeFile = fs.readFileSync("home.html", "utf-8");
//functions for replacing the data
const replacedata = (preFile, cngFile) => {
  const fs = require("fs");
  let changeData = preFile.replace("{%tempmain%}", cngFile.main.temp);
  changeData = changeData.replace("{%tempmin%}", cngFile.main.temp_min);
  changeData = changeData.replace("{%tempmax%}", cngFile.main.temp_max);
  changeData = changeData.replace("{%location%}", cngFile.name);
  changeData = changeData.replace("{%country%}", cngFile.sys.country);
  changeData = changeData.replace("{%tempstatus%}", cngFile.weather[0].main);
  //if you want to create another file for client
  // fs.writeFileSync("temp.html", changeData);
  return changeData;
};
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=kolkata&units=metric&appid=827788fcf1df41ec70e9c1d2faaf39cf"
    )
      .on("data", (chunk) => {
        let objChunk = JSON.parse(chunk);
        let arrobj = [objChunk];

        const RealTimedata = arrobj
          .map((val) => replacedata(HomeFile, val))
          .join("");
        console.log(RealTimedata);

        // res.write(RealTimedata);
      })

      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.write("<h1>404 not found</h1>");
  }
  res.end();
});
const port = "8800";
const hostname = "127.0.0.1";
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

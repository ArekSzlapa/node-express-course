const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homepage = readFileSync("./navbar-app/index.html", "utf8");
const styles = readFileSync("./navbar-app/styles.css", "utf8");
const js = readFileSync("./navbar-app/browser-app.js", "utf8");
const logo = readFileSync("./navbar-app/logo.svg", "utf8");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homepage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About page</h1>");
    res.end();
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(styles);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(js);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(logo);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("404 not found :(");
    res.end();
  }
});

server.listen(5000);

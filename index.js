import http from "http";
const PORT = 8000;
const users = [
    { id: 1, name: "Devin" },
    { id: 2, name: "Dimas" },
    { id: 3, name: "Daffa" },
];
const server = http.createServer((req, res) => {
    if (req.url === "/api" && req.method === "GET") {
        res.writeHead(200);
        res.write("Welcome to my API");
        res.end();
    }
    else if (req.url === "/users" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
    }
    else {
        res.writeHead(404);
        res.write("route not Found");
        res.end();
    }
});
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

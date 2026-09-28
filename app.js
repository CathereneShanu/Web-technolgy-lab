const http = require("http");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function startServer() {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("collegeDB");
    const users = db.collection("users");

    const server = http.createServer((req, res) => {
        if (req.url === "/" && req.method === "GET") {
            fs.readFile("index.html", (err, data) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end("Error loading page");
                    return;
                }
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            });
        }

        if (req.url === "/server" && req.method === "POST") {
            let body = "";

            req.on("data", chunk => {
                body += chunk.toString();
            });

            req.on("end", async () => {
                const params = new URLSearchParams(body);

                const user = {
                    name: params.get("name"),
                    password: params.get("password"),
                    age: params.get("age"),
                    mobile: params.get("mobile"),
                    email: params.get("email"),
                    gender: params.get("gender"),
                    state: params.get("state"),
                    skills: params.getAll("skills")
                };

                await users.insertOne(user);

                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(`
                    <h1>User Submitted Details</h1>
                    <table border="1" cellpadding="8">
                        <tr><th>Field</th><th>Value</th></tr>
                        <tr><td>Name</td><td>${user.name}</td></tr>
                        <tr><td>Password</td><td>${user.password}</td></tr>
                        <tr><td>Age</td><td>${user.age}</td></tr>
                        <tr><td>Mobile Number</td><td>${user.mobile}</td></tr>
                        <tr><td>Email</td><td>${user.email}</td></tr>
                        <tr><td>Gender</td><td>${user.gender}</td></tr>
                        <tr><td>State</td><td>${user.state}</td></tr>
                        <tr><td>Skills</td><td>${user.skills.join(", ")}</td></tr>
                    </table>
                `);
            });
        }
    });

    server.listen(5000, () => {
        console.log("Server running at http://localhost:5000");
    });
}

startServer();
import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const app = express();
const PORT = 8000;

app.use(express.json()); // agar bisa menerima req.body

const getData = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = `${__dirname}/db.json`;
  const rawdata = fs.readFileSync(filePath).toString();
  return rawdata;
};

const writeData = (data: string) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = `${__dirname}/db.json`;
  fs.writeFileSync(filePath, data);
};

app.get("/api", (_req, res) => {
  res.status(200).send("Welcome to my API");
});

app.get("/users", (_req, res) => {
  const result = JSON.parse(getData());
  res.status(200).send(result.users);
});

app.post("/users", (req, res) => {
  //  1. get seluruh data users
  const result = JSON.parse(getData());
  // 2. ambil latest id
  const latestId = result.users[result.users.length - 1].id;

  // 3. tambahkan data baru berdarkan req body
  result.users.push({
    id: latestId + 1,
    name: req.body.orang,
  });

  // 4. jalankan fungsi writeData berdasarkan data yg sudah ditambahkan
  writeData(JSON.stringify(result));

  // 5. kirim response belum add new user success
  res.status(200).send("Add new user success");
});

app.use((_req, res) => {
  res.status(404).send({ message: "route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
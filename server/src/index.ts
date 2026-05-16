import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
if(!PORT) throw new Error("PORT is not defined");

const app = express();

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});

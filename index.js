const express = require("express");
const cors = require("cors");
const crypto = require("node:crypto");
require("dotenv").config()

const app = express();

app.use(cors())
app.get("/get-otp", (req, res) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const cipher = crypto.createCipheriv(
      'aes-256-ecb',
      process.env.AES_PUBLIC_KEY,
      null,
    );
    let encryptedData = cipher.update(code.toString(), 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    res.json({
        code: encryptedData,
        meta: {
            method: "AES",
            bit: "256",
            mode: "ECB",
            secretKey: process.env.AES_PUBLIC_KEY
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT: ${process.env.PORT}`)
})
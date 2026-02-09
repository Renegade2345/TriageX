const fs = require("fs");
const pdfParse = require("pdf-parse");

async function parseDocument(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileBuffer = fs.readFileSync(filePath);

  if (filePath.endsWith(".pdf")) {
    const data = await pdfParse(fileBuffer);
    return data.text;
  }

  if (filePath.endsWith(".txt")) {
    return fileBuffer.toString("utf-8");
  }

  throw new Error("Unsupported file type. Only PDF and TXT allowed.");
}

module.exports = { parseDocument };

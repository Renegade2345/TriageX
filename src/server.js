const app = require("./app");
const { parseDocument } = require("./extractor/pdfParser");
const { extractFields } = require("./extractor/fieldExtractor");

const path = require("path");

const PORT = 3000;

async function testParser() {
  try {
    const filePath = path.join(__dirname, "../sample_docs/Policy Number ABC12345.txt");
    const text = await parseDocument(filePath);

    const fields = extractFields(text);

console.log("----- EXTRACTED FIELDS -----");
console.log(fields);
console.log("-----------------------------");


    console.log("----- PARSED TEXT PREVIEW -----");
    console.log(text.substring(0, 500));
    console.log("--------------------------------");
  } catch (error) {
    console.error("Parser Error:", error.message);
  }
}

testParser();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

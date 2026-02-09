const { parseDocument } = require("./extractor/pdfParser");
const { extractFields } = require("./extractor/fieldExtractor");
const { validateFields } = require("./validator/validator");
const { routeClaim } = require("./router/routingEngine");

/**
 * Main claim processing pipeline
 * @param {string} filePath
 */
async function processClaim(filePath) {
  const text = await parseDocument(filePath);

  const extractedFields = extractFields(text);

  const validation = validateFields(extractedFields);

  const routing = routeClaim(
    validation.normalizedFields,
    validation.missingFields
  );

  return {
    extractedFields: validation.normalizedFields,
    missingFields: validation.missingFields,
    recommendedRoute: routing.recommendedRoute,
    reasoning: routing.reasoning,
  };
}

module.exports = { processClaim };

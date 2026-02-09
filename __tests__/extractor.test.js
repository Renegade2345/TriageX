const { extractFields } = require("../src/extractor/fieldExtractor");

describe("Field Extraction", () => {
  test("should extract policy number correctly", () => {
    const text = "Policy Number: ABC123";
    const result = extractFields(text);
    expect(result.policyNumber).toBe("ABC123");
  });

  test("should return null if field is missing", () => {
    const text = "Some random text";
    const result = extractFields(text);
    expect(result.policyNumber).toBeNull();
  });
});

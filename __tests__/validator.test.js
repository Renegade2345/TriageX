const { validateFields } = require("../src/validator/validator");

describe("Validation and Normalization", () => {
  test("should normalize numeric values correctly", () => {
    const fields = {
      estimatedDamage: "$20,000",
      initialEstimate: "15000",
    };

    const result = validateFields(fields);

    expect(result.normalizedFields.estimatedDamage).toBe(20000);
    expect(result.normalizedFields.initialEstimate).toBe(15000);
  });

  test("should convert invalid numeric input to null", () => {
    const fields = {
      estimatedDamage: "twenty thousand",
      initialEstimate: "abc",
    };

    const result = validateFields(fields);

    expect(result.normalizedFields.estimatedDamage).toBeNull();
    expect(result.normalizedFields.initialEstimate).toBeNull();
  });

  test("should detect missing mandatory fields", () => {
    const fields = {
      policyNumber: null,
    };

    const result = validateFields(fields);

    expect(result.missingFields.length).toBeGreaterThan(0);
  });
});

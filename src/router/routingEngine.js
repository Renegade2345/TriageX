/**
 * Determines claim routing based on validation and business rules
 * @param {object} fields
 * @param {string[]} missingFields
 * @returns {{ recommendedRoute: string, reasoning: string }}
 */
function routeClaim(fields, missingFields) {
  // 1️⃣ Manual Review if missing fields
  if (missingFields.length > 0) {
    return {
      recommendedRoute: "Manual Review",
      reasoning: `Mandatory fields missing: ${missingFields.join(", ")}.`,
    };
  }

  const description = fields.description?.toLowerCase() || "";
  const claimType = fields.claimType?.toLowerCase() || "";
  const damage = fields.estimatedDamage;

  // 2️⃣ Fraud keyword detection
  const fraudKeywords = ["fraud", "inconsistent", "staged"];

  const hasFraudKeyword = fraudKeywords.some((keyword) =>
    description.includes(keyword)
  );

  if (hasFraudKeyword) {
    return {
      recommendedRoute: "Investigation Flag",
      reasoning: "Description contains potential fraud indicators.",
    };
  }

  // 3️⃣ Injury claims
  if (claimType === "injury") {
    return {
      recommendedRoute: "Specialist Queue",
      reasoning: "Claim type is injury and requires specialist handling.",
    };
  }

  // 4️⃣ Fast-track for low damage
  if (typeof damage === "number" && damage < 25000) {
    return {
      recommendedRoute: "Fast-track",
      reasoning: "Estimated damage is below 25,000 and all mandatory fields are present.",
    };
  }

  // Default
  return {
    recommendedRoute: "Standard Processing",
    reasoning: "Claim meets standard processing criteria.",
  };
}

module.exports = { routeClaim };

/**
 * Determines claim routing based on validation and business rules
 * @param {object} fields
 * @param {string[]} missingFields
 * @returns {{ recommendedRoute: string, reasoning: string }}
 */
function routeClaim(fields, missingFields) {
  // Manual Review if missing fields
  if (missingFields.length > 0) {
    return {
      recommendedRoute: "Manual Review",
      reasoning: `Mandatory fields missing: ${missingFields.join(", ")}.`,
    };
  }

  const description = fields.description?.toLowerCase() || "";
  const claimType = fields.claimType?.toLowerCase() || "";
  const damage = fields.estimatedDamage;

  
  // Fraud keyword detection 
const fraudKeywords = ["fraud", "inconsistent", "staged"];

// Negative context patterns
const negativePatterns = [
  "no fraud",
  "not fraud",
  "no signs of fraud",
  "fraud not suspected",
  "no staged",
  "not staged"
];

const containsFraudKeyword = fraudKeywords.some((keyword) =>
  description.includes(keyword)
);

const containsNegativeContext = negativePatterns.some((pattern) =>
  description.includes(pattern)
);

if (containsFraudKeyword && !containsNegativeContext) {
  return {
    recommendedRoute: "Investigation Flag",
    reasoning: "Description contains potential fraud indicators.",
  };
}


  // Injury claims
  if (claimType === "injury") {
    return {
      recommendedRoute: "Specialist Queue",
      reasoning: "Claim type is injury and requires specialist handling.",
    };
  }

  // Fast-track for low damage
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

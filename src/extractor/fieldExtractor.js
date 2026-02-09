/**
 * Extracts structured fields from raw FNOL text
 * @param {string} text
 * @returns {object}
 */
function extractFields(text) {
  const extract = (regex) => {
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  const extracted = {
    policyNumber: extract(/Policy Number:\s*(.*)/i),
    policyholderName: extract(/Policyholder Name:\s*(.*)/i),
    effectiveDates: extract(/Effective Dates:\s*(.*)/i),

    incidentDate: extract(/Date:\s*(.*)/i),
    incidentTime: extract(/Time:\s*(.*)/i),
    location: extract(/Location:\s*(.*)/i),
    description: extract(/Description:\s*(.*)/i),

    claimant: extract(/Claimant:\s*(.*)/i),
    thirdParties: extract(/Third Parties:\s*(.*)/i),
    contactDetails: extract(/Contact Details:\s*(.*)/i),

    assetType: extract(/Asset Type:\s*(.*)/i),
    assetId: extract(/Asset ID:\s*(.*)/i),
    estimatedDamage: extract(/Estimated Damage:\s*(.*)/i),

    claimType: extract(/Claim Type:\s*(.*)/i),
    attachments: extract(/Attachments:\s*(.*)/i),
    initialEstimate: extract(/Initial Estimate:\s*(.*)/i),
  };

  return extracted;
}

module.exports = { extractFields };

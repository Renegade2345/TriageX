/**
 * Validates extracted fields
 * @param {object} fields
 * @returns {{ missingFields: string[], normalizedFields: object }}
 */
function validateFields(fields) {
  const mandatoryFields = [
    "policyNumber",
    "policyholderName",
    "effectiveDates",
    "incidentDate",
    "incidentTime",
    "location",
    "description",
    "claimant",
    "assetType",
    "assetId",
    "estimatedDamage",
    "claimType",
    "attachments",
    "initialEstimate",
  ];

  const missingFields = [];

  mandatoryFields.forEach((field) => {
    if (!fields[field] || fields[field].trim() === "") {
      missingFields.push(field);
    }
  });

  // Normalize numeric fields
  const normalizedFields = { ...fields };

  if (fields.estimatedDamage) {
    normalizedFields.estimatedDamage = parseFloat(
      fields.estimatedDamage.replace(/[^0-9.]/g, "")
    );
  }

  if (fields.initialEstimate) {
    normalizedFields.initialEstimate = parseFloat(
      fields.initialEstimate.replace(/[^0-9.]/g, "")
    );
  }

  return {
    missingFields,
    normalizedFields,
  };
}

module.exports = { validateFields };

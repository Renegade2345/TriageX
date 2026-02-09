/**
 * Validates and normalizes extracted claim fields
 * - Detects missing mandatory fields
 * - Normalizes numeric values
 * - Handles invalid numeric formats safely
 *
 * @param {object} fields
 * @returns {{
 *   missingFields: string[],
 *   normalizedFields: object
 * }}
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

  const normalizedFields = { ...fields };
  const missingFields = [];

  
  if (fields.estimatedDamage) {
    const parsedDamage = parseFloat(
      String(fields.estimatedDamage).replace(/[^0-9.]/g, "")
    );

    normalizedFields.estimatedDamage = isNaN(parsedDamage)
      ? null
      : parsedDamage;
  }

  if (fields.initialEstimate) {
    const parsedEstimate = parseFloat(
      String(fields.initialEstimate).replace(/[^0-9.]/g, "")
    );

    normalizedFields.initialEstimate = isNaN(parsedEstimate)
      ? null
      : parsedEstimate;
  }

 
  mandatoryFields.forEach((field) => {
    const value = normalizedFields[field];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      missingFields.push(field);
    }
  });

  return {
    missingFields,
    normalizedFields,
  };
}

module.exports = { validateFields };

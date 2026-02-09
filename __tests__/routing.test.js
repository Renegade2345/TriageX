const { routeClaim } = require("../src/router/routingEngine");

describe("Routing Engine", () => {
  test("should route to Manual Review if missing fields exist", () => {
    const result = routeClaim({}, ["policyNumber"]);
    expect(result.recommendedRoute).toBe("Manual Review");
  });

  test("should route to Investigation Flag for fraud keyword", () => {
    const fields = {
      description: "This accident appears staged",
      claimType: "vehicle",
      estimatedDamage: 30000,
    };

    const result = routeClaim(fields, []);
    expect(result.recommendedRoute).toBe("Investigation Flag");
  });

  test("should route to Specialist Queue for injury claim", () => {
    const fields = {
      description: "Accident occurred",
      claimType: "injury",
      estimatedDamage: 30000,
    };

    const result = routeClaim(fields, []);
    expect(result.recommendedRoute).toBe("Specialist Queue");
  });

  test("should route to Fast-track if damage < 25000", () => {
    const fields = {
      description: "Minor accident",
      claimType: "vehicle",
      estimatedDamage: 20000,
    };

    const result = routeClaim(fields, []);
    expect(result.recommendedRoute).toBe("Fast-track");
  });
});

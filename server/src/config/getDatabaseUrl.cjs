const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/reading-journey_development",
      test: "postgres://postgres:postgres@localhost:5432/reading-journey_test",
      e2e: "postgres://postgres:postgres@localhost:5432/reading-journey_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;

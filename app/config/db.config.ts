export const dbConfig = {
    HOST: "localhost:5432", // Replace it with your own host address
    USER: "postgres", // Replace with your own username
    PASSWORD: "1", // Replace with your own password
    DB: "testdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
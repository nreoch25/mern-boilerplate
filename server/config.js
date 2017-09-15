const config = {
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/db-mern"
};

export default config;

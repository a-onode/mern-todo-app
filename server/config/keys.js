module.exports = {
  app: {
    name: 'MERN TODO APP',
    apiUrl: process.env.API_URL,
    serverUrl: process.env.SERVER_URL,
    clientUrl: process.env.CLIENT_URL
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d'
  }
};

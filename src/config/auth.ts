export default {
  jwt: {
    secret: process.env.APP_SECRET || 'batata',
    expiresIn: '1d',
  },
};

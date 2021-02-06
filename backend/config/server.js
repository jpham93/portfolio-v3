require('dotenv').config();
const { APP_HOST, NODE_PORT, PROD_URL } = process.env;

module.exports = ({ env }) => ({
	host: APP_HOST,
  port: NODE_PORT,
  url: PROD_URL, 
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'abedad3b8edfa6773dc98da37b981839'),
    },
  },
});

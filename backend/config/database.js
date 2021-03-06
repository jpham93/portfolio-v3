const { DB_URI_PROD, DB_URI_DEV, DB_SSL_FLAG } = process.env

// for deploy
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: DB_URI_PROD,
      },
      options: {
        ssl: DB_SSL_FLAG === 'true',
      },
    },
  },
});

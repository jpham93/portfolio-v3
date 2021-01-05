const { DB_URI_PROD, DB_URI_DEV, DB_SSL_FLAG } = process.env

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: DB_URI_DEV,
      },
      options: {
        ssl: DB_SSL_FLAG === 'true',
      },
    },
  },
});

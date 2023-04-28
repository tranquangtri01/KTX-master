module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fe21ca62c7de6c9a2dad93c639affc6a'),
  },
});

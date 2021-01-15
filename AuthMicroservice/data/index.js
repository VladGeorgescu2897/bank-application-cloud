const {
    Pool
  } = require('pg');
  
  const {
    getSecret
  } = require('docker-secret');

const jwt_options = {
  issuer: process.env.NODE_ENV === 'development' ? process.env.JWT_ISSUER : getSecret(process.env.JWT_ISSUER_FILE),
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE
};

const jwt_secret_key = (process.env.NODE_ENV === 'development' ? process.env.JWT_SECRET_KEY : getSecret(process.env.JWT_SECRET_KEY_FILE));

  const options = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    user: process.env.NODE_ENV === 'development' ? process.env.PGUSER : getSecret(process.env.PGUSER_FILE),
    password: process.env.NODE_ENV === 'development' ? process.env.PGPASSWORD : getSecret(process.env.PGPASSWORD_FILE)
  }
  
  const pool = new Pool(options);
  
  const query = async (text, params) => {
    const {
      rows,
    } = await pool.query(text, params);
    return rows;
  };
  
  module.exports = {
    query,
    jwt_options,
    jwt_secret_key
  };
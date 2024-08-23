const pagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  return {offset, limit, page};
};

const infoLog = (message) => {
  console.info(`[${new Date().toISOString()}] ${message}`);
};

module.exports = {pagination, infoLog};

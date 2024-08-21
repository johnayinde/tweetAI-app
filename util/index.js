const pagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  return {offset, limit, page};
};

module.exports = {pagination};

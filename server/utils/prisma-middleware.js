const applyMiddleware = (prisma) => {
  prisma.$use(async (params, next) => {
    return next(params);
  });
};

module.exports = applyMiddleware;

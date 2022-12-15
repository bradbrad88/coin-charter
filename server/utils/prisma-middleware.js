const applyMiddleware = (prisma) => {
  prisma.$use(async (params, next) => {
    return next(params);
  });
};

export default applyMiddleware;

const router = require('express').Router();
const chartRoutes = require('./chartRoute');
const commentRoutes = require('./commentRoute');
const favouriteRoutes = require('./favouritesRoute');
const userRoutes = require('./userRoute');

router.use('/charts', chartRoutes);
router.use('/comments', commentRoutes);
router.use('/favourites', favouriteRoutes);
router.use('/users', userRoutes);

module.exports = router;
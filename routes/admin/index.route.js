const dashboardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const trashRoutes = require("./trash.route")
const productsCategoryRoutes = require("./products-category.route")
const roleRoutes = require("./role.route")
const accountRoutes = require("./account.route")
const authRoutes = require("./auth.route")
const myAccountRoutes = require("./my-account.route")
const authMiddleware = require("../../middlewares/admin/auth.middeware")
const systemConfig = require("../../config/system")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(
        PATH_ADMIN + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRoutes);

    app.use(PATH_ADMIN + '/products', authMiddleware.requireAuth,  productRoutes);

    app.use(PATH_ADMIN + '/products-category', authMiddleware.requireAuth,  productsCategoryRoutes);

    app.use(PATH_ADMIN + '/trash', authMiddleware.requireAuth, trashRoutes);

    app.use(PATH_ADMIN + '/role', authMiddleware.requireAuth, roleRoutes);

    app.use(PATH_ADMIN + '/account', authMiddleware.requireAuth, accountRoutes);

    app.use(PATH_ADMIN + '/auth',  authRoutes);

    app.use(PATH_ADMIN + '/my-account', authMiddleware.requireAuth,  myAccountRoutes);


}
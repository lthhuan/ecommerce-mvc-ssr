const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/trash.controller")

router.get('/products', controller.index);
router.patch('/products/restore/:id', controller.restore)
router.delete('/products/delete-hard/:id', controller.deleteHard)
router.get('/products-category', controller.productsCategoryTrash);
router.patch('/products-category/restore/:id', controller.productsCategoryRestore)
router.delete('/products-category/delete-hard/:id', controller.deleteHardCategory)
module.exports = router;
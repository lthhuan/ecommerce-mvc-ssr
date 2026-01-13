const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system")

const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")



// [GET]  admin/trash
module.exports.index = async (req, res) => {



    let find = {
        deleted: true
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }



    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        req.query,
        {
            limitItem: 4,
            currentPage: 1
        },

        countProducts

    )

    const products = await Product.find(find)
        .sort({ position: 'desc' })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)




    res.render("admin/pages/trash/index", {
        pageTitle: "Trang khôi phục sản phẩm",
        products: products,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}



// [PATCH]  admin/trash/restore/:id

module.exports.restore = async (req, res) => {
    const id = req.params.id

    try {
        await Product.updateOne({_id: id}, {deleted: false})
        req.flash("success", "Khôi phục sản phẩm thành công")
    } catch (error) {
        req.flash("error", "Khôi phục sản phẩm thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/trash/products`);
}
// [DELETE]  admin/trash/delete-hard/

module.exports.deleteHard = async (req, res) => {
    const id = req.params.id

    try {
        await Product.deleteOne({_id: id})
        req.flash("success", "Xóa vĩnh viễn sản phẩm thành công")
    } catch (error) {
        req.flash("error", "Xóa vĩnh viễn sản phẩm thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/trash/products`);
}

// [GET]  admin/trash/products-category
module.exports.productsCategoryTrash = async (req, res) => {



    let find = {
        deleted: true
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }



    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        req.query,
        {
            limitItem: 4,
            currentPage: 1
        },

        countProducts

    )

    const data = await ProductCategory.find(find)
        .sort({ position: 'desc' })
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)




    res.render("admin/pages/trash/products-category", {
        pageTitle: "Trang khôi phục danh mục sản phẩm",
        data: data,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}

// [PATCH]  admin/trash/restore/:id

module.exports.productsCategoryRestore = async (req, res) => {
    const id = req.params.id

    try {
        await ProductCategory.updateOne({_id: id}, {deleted: false})
        req.flash("success", "Khôi phục danh mục sản phẩm thành công")
    } catch (error) {
        req.flash("error", "Khôi phục danh mục sản phẩm thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [DELETE]  admin/trash/delete-hard/

module.exports.deleteHardCategory = async (req, res) => {
    const id = req.params.id
    const hasChildren = await ProductCategory.exists({
            parent_id: id,
            deleted: true
        })

    if (hasChildren) {
            req.flash("error", "Không thể xóa danh mục vì còn danh mục con!!")
            return res.redirect(`${systemConfig.prefixAdmin}/trash/products-category`);
        }

    try {
        await ProductCategory.deleteOne({_id: id})
        req.flash("success", "Xóa vĩnh viễn danh mục sản phẩm thành công")
    } catch (error) {
        req.flash("error", "Xóa vĩnh viễn danh mục sản phẩm thất bại")
    }
    res.redirect(`${systemConfig.prefixAdmin}/trash/products-category`);
}
const Product = require("../../models/product.model")

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/filterStatus")
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
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}

// [GET]  admin/trash
module.exports.index = async (req, res) => {


    const filterStatus = filterStatusHelper(req.query)

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
    res.redirect(`${systemConfig.prefixAdmin}/trash`);
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
    res.redirect(`${systemConfig.prefixAdmin}/trash`);
}
const ProductCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helpers/createTree")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")


// [GET]  admin/products-category
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: { $ne: true }
    }
    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }

    let sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue

    } else {
        sort.position = "desc"
    }
 
    const records = await ProductCategory.find(find).sort({ position: 1 });

    const newRecords = createTreeHelper.tree(records);


    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        records: newRecords,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
 
    });
}

// [GET]  admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }


    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records);



    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    });
}

// [POST]  admin/products-category/create

module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1

    } else {
        req.body.position = parseInt(req.body.position)
    }

    const record = new ProductCategory(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [GET]  admin/products-category/edit/:id
module.exports.edit = async (req, res) => {


    try {
        const id = req.params.id


        const data = await ProductCategory.findOne({
            deleted: false,
            _id: id
        })

        const records = await ProductCategory.find({
            deleted: false
        })

        const newRecords = createTreeHelper.tree(records);

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }




}

// [PATCH]  admin/products-category/editPatch/:id

module.exports.editPatch = async (req, res) => {

    const id = req.params.id
    req.body.position = parseInt(req.body.position)

    await ProductCategory.updateOne({ _id: id }, req.body)

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}


// [DELETE]  admin/products-category/delete/:id

module.exports.delete = async (req, res) => {
    const id = req.params.id
    const hasChildren = await ProductCategory.exists({
        parent_id: id,
        deleted: false
    })

    if (hasChildren) {
        req.flash("error", "Không thể xóa danh mục vì còn danh mục con!!")
        return res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
    const hasProducts = await Product.exists({
        category_id: id,
        deleted: false
    });
    if (hasProducts) {
        req.flash("error", "Không thể xóa danh mục đang có sản phẩm!!")
        return res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }

    await ProductCategory.updateOne({ _id: id }, { deleted: true });
    req.flash("success", "Xóa thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}
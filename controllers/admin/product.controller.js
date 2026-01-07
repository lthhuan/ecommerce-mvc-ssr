const Product = require("../../models/product.model")

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")



// [GET]  admin/products
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



    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        req.query,
        {
            limitItem: 4,
            currentPage: 1
        },

        countProducts

    )

    // Sort 

    let sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue

    } else {
        sort.position = "desc"
    }
    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)




    res.render("admin/pages/products/index", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}

// [PATCH]  admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    try {
        await Product.updateOne({ _id: id }, { status: status })
        req.flash("success", "Cập nhật trạng thái thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật trạng thái thất bại!")
    }
    res.redirect(req.get('Referrer') || '/');


}

// [PATCH]  admin/products/change-status/:status/:id
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    //    console.log(req.body)

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })

            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "delete":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            })
            break;
        case "change-position":

            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                console.log(id)
                console.log(position)
                await Product.updateOne({ _id: { $in: id } }, { position: position })

            }

            break;

        default:
            break;
    }
    res.redirect(req.get('Referrer') || '/');
}

// [PATCH]  admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    try {
        await Product.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: new Date()

        })
        req.flash("success", "Xóa sản phẩm thành công")

    } catch (error) {
        req.flash("error", "Xóa sản phẩm thất bại")
    }

    res.redirect(req.get('Referrer') || '/');
}


// [GET]  admin/products/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/products/create", {
        pageTitle: "Thêm sản phẩm mới",
    });
}

// [POST]  admin/products/create

module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1

    } else {
        req.body.position = parseInt(req.body.position)
    }



    try {
        const product = new Product(req.body)
        await product.save();
        req.flash("success", "Tạo sản phẩm thành công")

    } catch (error) {
        req.flash("error", "Tạo sản phẩm thất bại")
    }

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET]  admin/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        // console.log(product)

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}


// [POST]  admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({ _id: id }, req.body)
        req.flash("success", "Cập nhật sản phẩm thành công!")


    } catch (error) {
        req.flash("error", "Cập nhật sản phẩm thất bại!")
    }

    res.redirect(req.get('Referrer') || '/')

}


// [GET]  admin/products/detail/:id
module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find)

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}



const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const paginationHelper = require("../../helpers/pagination")
const searchHelper = require("../../helpers/search")
var md5 = require('md5');


// [GET]  admin/account
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.fullName = objectSearch.regex
    }
    const countAccounts = await Account.countDocuments(find);

    let objectPagination = paginationHelper(
        req.query,
        {
            limitItem: 4,
            currentPage: 1
        },

        countAccounts

    )
    const records = await Account.find(find).select("-password -token").limit(objectPagination.limitItem).skip(objectPagination.skip).populate("role_id", "title");
    res.render("admin/pages/account/index", {
        pageTitle: "Trang tài khoản",
        records: records,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        objectPagination: objectPagination
    });
}

// [GET]  admin/account/create
module.exports.create = async (req, res) => {

    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/account/create", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    });
}

// [POST]  admin/account/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.exists({
        email: req.body.email,
        deleted: false
    })
    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`)
        res.redirect(`${systemConfig.prefixAdmin}/account/create`)
    } else {
        req.body.password = (md5(req.body.password))
        const record = new Account(req.body)
        await record.save()
        req.flash("success", `Tài khoản ${req.body.email} đã được tạo thành công`)
        res.redirect(`${systemConfig.prefixAdmin}/account`);
    }

}

// [GET]  admin/account/edit
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const data = await Account.findOne(find)

        const roles = await Role.find({
            deleted: false
        })



        res.render("admin/pages/account/edit", {
            pageTitle: "Trang chỉnh sửa thông tin tài khoản",
            data: data,
            roles: roles
        });

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/account`);
    }

}

// [POST]  admin/account/edit
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    const emailExist = await Account.exists({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    })

    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại!`)
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password
        }
        await Account.updateOne({ _id: id }, req.body)
        req.flash("success", `Cập nhật tài khoản ${req.body.email} thành công`)
    }
     res.redirect(`${systemConfig.prefixAdmin}/account`);

}


// [GET]  admin/account/detail
module.exports.detail = async (req, res) => {
    const id =req.params.id
    const data = await Account.findOne({
        _id: id, 
        deleted: false
    }).populate("role_id", "title");

    res.render("admin/pages/account/detail", {
        pageTitle: "Trang thông tin tài khoản",
        data: data
    });
}
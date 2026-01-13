const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system")
const permissionsConfig = require("../../config/permissions");



// [GET]  admin/role
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)
    res.render("admin/pages/role/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

// [GET]  admin/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/role/create", {
        pageTitle: "Tạo nhóm quyền"
    });
}

// [POST]  admin/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/role`);
}

// [GET]  admin/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)
    res.render("admin/pages/role/permissions", {
        pageTitle: "Thiết lập nhóm quyền",
        records: records,
        permissionsConfig: permissionsConfig
    });
}

// [PATCH]  admin/permissions
module.exports.permissionsPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions)
        for (const item of permissions) {
            await Role.updateOne({ _id: item.id }, { permissions: item.permissions })

        }
        req.flash("success", "Cập nhật phân quyền thành công")
        res.redirect(`${systemConfig.prefixAdmin}/role`);

    } catch (error) {
        req.flash("error", "Cập nhật phân quyền thất bại")
        res.redirect(`${systemConfig.prefixAdmin}/role`);
    }   

}
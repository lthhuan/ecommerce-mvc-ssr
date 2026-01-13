module.exports.createPost = (req, res, next) => {
    if(!req.body.fullName){
        req.flash("error", "Vui lòng nhập Họ và tên!!")
        res.redirect("/admin/account/create")
        return

    }
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!!")
        res.redirect("/admin/account/create")
        return

    }
    if(!req.body.password){
        req.flash("error", "Vui lòng nhập mật khẩu!!")
        res.redirect("/admin/account/create")
        return

    }
    next()
    
}   

module.exports.editPatch = (req, res, next) => {
    if(!req.body.fullName){
        req.flash("error", "Vui lòng nhập Họ và tên!!")
        res.redirect("/admin/account/create")
        return

    }
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!!")
        res.redirect("/admin/account/create")
        return

    }
    next()
    
}   
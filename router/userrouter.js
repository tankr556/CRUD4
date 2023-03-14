const router = require("express").Router();
const { triggerAsyncId } = require("async_hooks");
const User = require("../model/User")

router.get("/", (req, resp) => {
    resp.render("index");
})

router.post("/adduser", async (req, resp) => {
    try {
        const user = new User(req.body)
        await user.save();
        resp.render("index", { "msg": "Register Success fully" })
    } catch (error) {
        console.log(error);
    }
})

router.get("/display", async (req, resp) => {
    try {
        const users = await User.find();
        resp.render("display", { data: users })
    } catch (error) {

    }
})

router.get("/delete", async (req, resp) => {
    const _id = req.query.did
    try {
        await User.findByIdAndDelete(_id)
        resp.redirect("display")
    } catch (error) {
        console.log(error);
    }
})

router.get("/update", async (req, resp) => {
    const _id = req.query.uid
    try {
        const user = await User.findOne({ _id: _id })
        resp.render("update", { data: user })
    } catch (error) {
        console.log(error);
    }
})

router.post("/updateUser", async (req, resp) => {
    try {
        await User.findByIdAndUpdate(req.body.id, req.body)
        resp.redirect("display")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
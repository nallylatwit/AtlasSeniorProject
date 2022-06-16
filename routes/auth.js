const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("auth route test")
})

module.exports = router
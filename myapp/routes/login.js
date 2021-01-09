const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const user = require('../sql/user')


router.get('/',function(req,res,next){
    console.log('login  /')
    res.render('login')
})


router.post('/in',function(req,res,next){
    console.log('我进入 login  in里面了')
    let obj = req.body
    user.findOne(obj,(err,data)=>{
        if(err){
            console.log('err',err)
        }
        if(data){
            req.session.isLogin = 'ok'
            console.log('登录成功')
            res.redirect('/pro')
        }else {
            res.redirect('/login')
        }
    })

})




module.exports = router;
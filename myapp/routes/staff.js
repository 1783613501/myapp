var express = require('express');
var router = express.Router();
const staff = require('../sql/staff')
/* GET home page. */
router.get('/', function(req, res, next) {
    staff.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('staff', {
      index:3,
      data:data
    });
  })
});


router.get("/add", function (req, res, next) {
    res.render("staffAdd", {
      index: 3,
    });
  });
  
  router.post("/addAction", function (req, res, next) {
  
    console.log('进入/addAction里面了')
    let obj = req.body;
    // 调用方法转数字
    obj.age = Number(obj.age);
    //隐形转换
    obj.money = obj.money - 0;
     //隐形转换
    obj.time = obj.time * 1;
    console.log(obj);
    staff.insertMany(obj,(err,data)=>{
         if(err) {
           console.log(err)
         } 
         console.log(data)
         res.redirect("/staff");
    })
     
  });

  router.get("/delete", function (req, res, next) {
    //get来的数据在req.query.id
    // const id = req.query.id;
    console.log('我现在进入/delete里面了')
    console.log(req.query)
  
    staff.deleteOne({'_id':req.query._id},(err,data)=>{
       if(err){
         console.log(err)
       }
       console.log(data)
       res.redirect("/staff");
    })
  });



  //修改操作
router.get("/update", function (req, res, next) {
    //get来的数据在req.query.id    拿到宇宙唯一id
    console.log(req.query)
  
    const _id = req.query._id;
    console.log("_id", _id);
  
    staff.findById({"_id":_id},(err,data)=>{
      if(err){
        console.log(err)
      }
      console.log('我现在到了/update修改数据路由')
      console.log(data)
      console.log(data._id)
      res.render('staffUpdate',{
        index:3,
        data:data
      })
    })
  
   
  });
  
  // 修改操作 - 更新数据
  router.post("/updateAction", function (req, res, next) {
    console.log('我在/updateAction里面')
    // 接收当前商品的数据
    const obj = req.body;
  
    // 处理数据类型，符合数据集合的字段类型
    obj.age = Number(obj.age);
    obj.money = parseFloat(obj.money);
    obj.time = obj.time - 0;
    console.log('obj_id',obj)
    staff.findByIdAndUpdate( obj._id,obj,(err,data)=>{
        if(err) {
          console.log(err)
        }
        console.log(data)
        res.redirect("/staff");
  
    }) 
  });


  //员工搜索
router.get("/search", (req, res, next) => {
    console.log("商品搜索路由 搜索数据")
    const obj = req.query;
    let reg = new RegExp(obj.search);
    staff.find({name:reg},(err,data)=>{
      if(err){
        console.log(err)
      }
      console.log(data)
         res.render("staff", {
         index: 3,
         data,
      });
    })
  });



  //sort 排序
router.get("/sortTime1", (req, res, next) => {
    const obj = req.query;
      staff.find({}).sort({time:1}).exec((err,data)=>{
       if(err){
         console.log(err)
       }
       console.log(data)
         res.render("staff", {
        index: 3,
        data,
      })
     })
    
  });
  
  router.get("/sortTime2", (req, res, next) => {
    const obj = req.query;
    staff.find({}).sort({time:-1}).exec((err,data)=>{
       if(err){
         console.log(err)
       }
       console.log(data)
         res.render("staff", {
        index: 3,
        data,
      })
     })
  });

  router.get("/sortAge1", (req, res, next) => {
    const obj = req.query;
      staff.find({}).sort({age:1}).exec((err,data)=>{
       if(err){
         console.log(err)
       }
       console.log(data)
         res.render("staff", {
        index: 3,
        data,
      })
     })
    
  });
  
  router.get("/sortAge2", (req, res, next) => {
    const obj = req.query;
    staff.find({}).sort({age:-1}).exec((err,data)=>{
       if(err){
         console.log(err)
       }
       console.log(data)
         res.render("staff", {
        index: 3,
        data,
      })
     })
  });

module.exports = router;
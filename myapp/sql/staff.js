// const { num } = require('../../../day1/01.js')
const db = require('./db.js')
 
// 类似于lol 中的六神装 不能七神装的数据管理 fdsfsdfsdfsdf
const staffSchema = new db.mongoose.Schema ({
    "name":{type:String},
    "age":{type:Number},
    "sex":{type:String},
    "home":{type:String},
    "money":{type:Number},
    "phone":{type:String},
    "time":{type:Number},
})

 
module.exports = db.mongoose.model("staff",staffSchema)
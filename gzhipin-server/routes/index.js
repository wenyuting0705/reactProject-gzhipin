var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')
const filter={password:0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register',(req,res)=>{
  const {username,password,type}=req.body;

  UserModel.findOne({username},(err,userDoc)=>{
    if(userDoc){
      res.send({code:1,msg:'用户名已存在，请重新注册！'})
    }else {
      new UserModel({username,password:md5(password),type}).save((err,userDoc)=> {
        res.cookie('userid',userDoc._id,{maxAge:1000*60*60*24*7})
        res.json({code:0,data:{_id:userDoc._id,username,type}})
      })
    }
  })
})
router.post('/login',(req,res)=>{
  const {username,password}=req.body;
  UserModel.findOne({username,password:md5(password)},filter,(err,userDoc)=>{
    if(userDoc){
      res.cookie('userid', userDoc._id, {maxAge: 1000*60*60*24*7})

      res.send({code: 0, data: userDoc})
    }else {
      res.send({code: 1, msg: '用户名或密码错误!'})
    }
  })
})
module.exports = router;

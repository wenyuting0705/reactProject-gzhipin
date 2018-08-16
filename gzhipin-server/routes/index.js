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
router.post('/update', function (req, res) {
  // 得到请求cookie的userid
  const userid = req.cookies.userid
  if(!userid) {// 如果没有, 说明没有登陆, 直接返回提示
    return res.send({code: 1, msg: '请先登陆'});
  }

  //更新数据库中对应的数据
  UserModel.findByIdAndUpdate({_id: userid}, req.body, function (err, user) {// user是数据库中原来的数据
    const {_id, username, type} = user
    // node端 ...不可用
    // const data = {...req.body, _id, username, type}
    // 合并用户信息
    const data = Object.assign(req.body, {_id, username, type})
    // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
    res.send({code: 0, data})
  })
})


// 根据cookie获取对应的user
router.get('/user', function (req, res) {
  // 取出cookie中的userid
  const userid = req.cookies.userid
  if(!userid) {
    return res.send({code: 1, msg: '请先登陆'})
  }

  // 查询对应的user
  UserModel.findOne({_id: userid}, filter, function (err, user) {
    if(user) {
      return res.send({code: 0, data: user})
    } else {// cookie中的userid不正确
      res.clearCookie('userid')  // 删除不正确cookie数据
      return res.send({code: 1, msg: '请先登陆'})
    }
  })
})

router.get('/userlist',function(req, res){
  const { type } = req.query
  UserModel.find({type},filter, function(err,users){
    return res.json({code:0, data: users})
  })
})


module.exports = router;

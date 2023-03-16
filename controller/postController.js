const {v4: uuidv4} = require('uuid')
const Posts = require('../models/posts')
const jwt = require('jsonwebtoken')

// console.log(process.env.TOKEN_ENCODE)

exports.createPost=(req, res) => {
    const {title, details, role} = req.body
    let slug=uuidv4()
    var token = req.headers.authorization
    var token = token ? token.slice(7) : null;
    var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE)
    var ID = userInfo.userID
    var Name = userInfo.userName

    switch(true){
        case !title:
            return res.status(400).json({err:"no title"})
            break;
        case !details:
            return res.status(400).json({err:"no details"})
            break;
        case !role:
            return res.status(400).json({err:"no role"})
            break;
    }

    Posts.create({title, author:Name, author_id:ID, details, role, slug})
        .then((post) => {res.json(post)})
        .catch((err)=>{res.status(400).json({err:"something wrong"})})
}

exports.getAllPost=(req, res) => {
    Posts.find({}).sort({createdAt: -1}).exec()
        .then((posts) => {
            res.json(posts)
        })
}

exports.updatePost=(req, res) => {
    const {slug} = req.params
    const {title, details, role} = req.body
    Posts.findOneAndUpdate({slug},{title, details, role},{new:true}).exec()
        .then((post)=>{
            res.json(post)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
}

// exports.getPost=(req, res) => {
//     const token = req.headers.authorization
//     // res.json({"token": token})
//     var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE)
//     // var username = userInfo.userName
//     res.json(userInfo)
// }

exports.getPost=(req, res) => {
    var token = req.headers.authorization
    var token = token ? token.slice(7) : null;
    var userInfo = jwt.verify(token, process.env.TOKEN_ENCODE)
    if(userInfo) {
        var id = userInfo.userID
        Posts.find({author_id:id}).exec()
            .then((data)=>{
                res.json(data)
            })
            .catch((err)=>{
                res.status(400).json({err:"cant find"})
            })
    }
}

exports.singlePost=(req,res)=> {
    const {slug} =req.params
    Posts.findOne({slug}).exec()
        .then((post)=>{
            res.json(post)
        })
}

exports.removePost=(req, res)=> {
    const {slug} = req.params
    Posts.findOneAndRemove({slug}).exec()
        .then((res)=>{
            res.json({message:"ลบบทความเรียบร้อย"})
        })
        .catch((err)=>{
            console.log(err)
        })
}
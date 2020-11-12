const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")



router.post('/post',requireLogin,(req,res)=>{
    const {title,recipe,ingredient,pic} = req.body 
    if(!title || !recipe || !ingredient || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        recipe,
        ingredient,
        pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/posts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/post/:postId',requireLogin,(req,res)=>{
    Post.findById({_id:req.params.postId})
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/post/:postId',requireLogin,(req,res)=>{
    const {title, recipe, ingredient, pic} = req.body 
    if(!title || !recipe || !ingredient || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    
    Post.findByIdAndUpdate({_id:req.params.postId},{
        title,
        recipe, 
        ingredient, 
        pic
    },{new:true})
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.delete('/post/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = router;
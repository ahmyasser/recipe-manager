const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")



router.post('/createpost',requireLogin,(req,res)=>{
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
        return res.status(422).json({error:err})
    })
})

router.get('/posts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        return res.status(422).json({error:err})
    })
})

router.get('/getpost/:postId',requireLogin,(req,res)=>{
    Post.findById({_id:req.params.postId})
    .then(post=>{
        if(post.postedBy._id.toString() !== req.user._id.toString()){
            return res.status(401).json({error:'Unauthorized'})
            }
 
        return res.json({post})
    })
    .catch(err=>{
        return res.status(422).json({error:err})
    })
})

router.put('/updatepost/:postId',requireLogin,(req,res)=>{
    const {title, recipe, ingredient, pic} = req.body 
   
    if(!title || !recipe || !ingredient || !pic){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    
    Post.findByIdAndUpdate({_id:req.params.postId},{
        title,
        recipe, 
        ingredient, 
        pic
    },{new:true,useFindAndModify:true}).populate("postedBy","_id")
    .exec((err,post)=>{
   
        if(err || !post){
            return res.status(422).json({error:err})
        }
   
        if(post.postedBy._id.toString() !== req.user._id.toString()){
            return res.status(401).json({error:'Unauthorized'})
            }
  
         return res.json({post});
        })
    })


router.delete('/post/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId},{useFindAndModify:true})
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
                return res.status(422).json({error:err})
              })
        }
    })
})

module.exports = router;

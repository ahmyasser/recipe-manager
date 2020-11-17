import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { createPost} from '../store/actions/postActions';

import Error from '../Components/Error'

import '../Styles/CreatePost.css'

const CreatePost = ()=>{
    const history = useHistory()
    const dispatch = useDispatch(); 

    const [title,setTitle] = useState("")
    const [recipe,setRecipe] = useState("")
    const [ingredient,setIngredient] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [error,setError] = useState("")
    
    const isPending = useSelector(state => state.requestPosts.isPending);
   
    useEffect(()=>{
       if(url){
        createPost(dispatch,title, recipe, ingredient, url);
        if(!isPending)
         history.push('/')   
    }       
    },[dispatch, history, ingredient, isPending, recipe, title, url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","my recipes")
       data.append("cloud_name","my-recipes1997")
       fetch("https://api.cloudinary.com/v1_1/my-recipes1997/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
          setError(err);
    })

    
   }
 

   return(
       <div className="container">
       <div className="createWrapper">
           <input 
           type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="Recipe"
             value={recipe}
            onChange={(e)=>setRecipe(e.target.value)}
             />
             <input
             type="text"
              placeholder="Ingredient"
              value={ingredient}
             onChange={(e)=>setIngredient(e.target.value)}
              />
           <div>
            <div>
                <h2>Uplaod Image</h2>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            </div>
            <button onClick={()=>postDetails()}>
                Submit post
            </button>
            <Error msg={error}/>
       </div>
       </div>
   )
}


export default CreatePost;
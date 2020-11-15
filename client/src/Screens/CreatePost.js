import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import '../Styles/CreatePost.css'

const CreatePost = ()=>{
    const history = useHistory()
    
    const [title,setTitle] = useState("")
    const [recipe,setRecipe] = useState("")
    const [ingredient,setIngredient] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                recipe,
                ingredient,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              console.log({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               console.log({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[recipe, ingredient, history, title, url])
  
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
           console.log(err)
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
            type="textarea"
             placeholder="Recipe"
             value={recipe}
            onChange={(e)=>setRecipe(e.target.value)}
             />
             <input
             type="textarea"
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

       </div>
       </div>
   )
}


export default CreatePost;
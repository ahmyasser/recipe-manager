import {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'

import styled from "styled-components";
import {Container} from '../style';


const Post=() => {

    let { post_id } = useParams();
  const history = useHistory()

  const [title,setTitle] = useState("")
  const [recipe,setRecipe] = useState("")
  const [ingredient,setIngredient] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")

  useEffect(()=>{
     fetch(`/getpost/${post_id}`,{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
        setTitle(result.post.title);
        setRecipe(result.post.recipe);
        setIngredient(result.post.ingredient);
        setUrl(result.post.pic);
      
     }).catch((err)=>{
       console.log(err);
     }
     )
  },[post_id])


  const updateMessage=()=>{
    
    if(image) postDetails();

    fetch(`/updatepost/${post_id}`,{
        method:"put",
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
    .then(result=>{
       if(result.error){
          console.log({html: result.error,classes:"#c62828 red darken-3"})
       }
       else{
           console.log({html:"Updated Successfully",classes:"#43a047 green darken-1"});
        }
    }).catch(err=>{
        
        console.log(err)
    })
    
}

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


  const deletePost = (postid)=>{
    fetch(`/post/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(_=>{
        history.push('/')       
    })
}

const UpdateWrapper = styled.div`
width:900px;
display:flex;
justify-content:space-between;
align-items:Center;
`;


const ViewWrapper = styled.div`
margin-right:20px;
& img {
    height:60vh;
    width:80vh;
    }
    
`;

const Wraper= styled.div`
display:flex;
flex-direction:column;
`;


    return (
      <Container>
      <UpdateWrapper>

      <ViewWrapper>
      <h1>
      <Link to="" onClick={()=>deletePost(post_id)}>delete</Link>
      </h1>
          <img src={url} alt=""/>
      </ViewWrapper>
      <Wraper>
      <input 
          type="text"
           placeholder="title"
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
           />
          <input
           type="text"
            placeholder="recipe"
            value={recipe}
            onChange={(e)=>setRecipe(e.target.value)}
            />
            <input
            type="text"
             placeholder="ingredient"
             value={ingredient}
             onChange={(e)=>setIngredient(e.target.value)}
             />
          <div>
           <div>
               <span>Uplaod Image</span>
               <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
           </div>
           </div>
           <button onClick={()=>{updateMessage()}}>
               Submit update
           </button>
           </Wraper>
      </UpdateWrapper>

          </Container>


          

        );
  }
  
  export default Post;
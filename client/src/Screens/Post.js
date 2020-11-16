import {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux';
import {requestPost, updatePost, deletePost} from '../store/actions/postActions';

import Pending from '../Components/Pending'

import '../Styles/Post.css'

const Post=() => {

  let { post_id } = useParams()
  const history = useHistory()
 
  const {post, isPending} = useSelector(state => state.requestPosts);
  const dispatch = useDispatch(); 

  const [title,setTitle] = useState("")
  const [recipe,setRecipe] = useState("")
  const [ingredient,setIngredient] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")

  useEffect(()=>{
    requestPost(dispatch, post_id)  
  },[dispatch, post_id])

  useEffect( () => { 
    if(!post)
        history.push("/")
    },[history, post]);

    useEffect (()=>{
    if(!isPending){
        setTitle(post.title);
        setRecipe(post.recipe);
        setIngredient(post.ingredient);
        setUrl(post.pic);
}},[isPending,post])


  const updateMessage=()=>{
    
    if(image) postDetails();
    updatePost(dispatch, post_id,title,recipe,ingredient,url); 
    
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

if(isPending)
    return <Pending/>
else
    return (
    <div className="container">
        <div className="postWrapper">

            <div className="viewWrapper">
                <h1>
                    <Link to="" onClick={()=>deletePost(dispatch,post_id)}>DELETE</Link>
                </h1>
                <img src={url} alt=""/>
            </div>
      
            <div className="updateWrapper">
      
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
    </div>
</div>

</div>
)
  }
  
  export default Post;
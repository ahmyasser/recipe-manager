import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const Home  = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
       fetch('/posts',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.post)
       }).catch((err)=>{
         console.log(err);
       }
       )
    },[])

    const deletePost = (postid)=>{
        fetch(`/post/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
          data?       
          <div>
           {
               data.map(item=>{
                   return(
                       <div key={item._id}>
                            <h1 >
                              <i className="material-icons" onClick={()=>deletePost(item._id)}>delete</i>
                            
                            </h1>
                            <Link to={`/post/${item._id}`}>
                            <div>
                                <img src={item.pic} alt=""/>
                            </div>
                                <h1>{item.title}</h1>
                                <p>{item.recipe}</p>
                                <p>{item.ingredient} </p>
                              </Link>

                                </div>
                           
                   )
               })
           }
          
          
       </div>:
       <h1>err</h1>
   )
}
  
export default Home;
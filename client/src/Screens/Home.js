import React,{useState,useEffect} from 'react'

import Card from '../Components/Card'

import '../Styles/Home.css'

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
        <div className="homeWrapper">
           {
               data.map(item=>{
                   return(
                      <Card key={item._id} item={item} deletePost={deletePost} />                           
                   )
               })
           }
          
          
       </div>
          )
}
  
export default Home;
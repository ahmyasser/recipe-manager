import React,{useState,useEffect} from 'react'
import styled from "styled-components";

import Card from '../Components/Card'

const Home  = ()=>{

    const HomeWrapper = styled.section`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
  `;



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
        <HomeWrapper>
           {
               data.map(item=>{
                   return(
                      <Card key={item._id} item={item} deletePost={deletePost} />                           
                   )
               })
           }
          
          
       </HomeWrapper>
          )
}
  
export default Home;
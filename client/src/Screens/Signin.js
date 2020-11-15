import {useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import styled from "styled-components";
import { Container } from "../style";
import Signup from './Signup';

const Signin  = ()=>{
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return console.log("invalid email")
        }
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            
           if(data.error){
              console.log(data.error);
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               console.log("success");
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }


    const SignupWrapper=styled.div`
    width:900px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:Center;
    & h2 {
        font-size:30px;
        margin:30px;
    }
    & input {
        padding:10px;
        margin:10px;
    }
    & button {
        width:73%;
    }

`;
   return (
      <Container>
          <SignupWrapper>
            <h2>MyRecipes</h2>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                Login
            </button>
            <h2>
                <Link to="/signup">Sign Up</Link>
            </h2>
           
        </SignupWrapper>
      </Container>
   )
}
  export default Signin;
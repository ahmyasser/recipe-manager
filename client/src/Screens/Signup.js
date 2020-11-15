import React,{useState} from 'react'
import {Link,  useHistory} from 'react-router-dom';
import styled from "styled-components";
import {Container} from "../style"
const Signup = ()=>{

    const history = useHistory();
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const uploadFields = ()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        console.log('invalid email');
        return;
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              console.log({html: data.error,classes:"#c62828 red darken-3"});
           }
           else{
               console.log({html:data.message,classes:"#43a047 green darken-1"});
               history.push('/login');
           }
        }).catch(err=>{
            console.log(err);
        })
    }
    const PostData = ()=>uploadFields();

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

    return(
 <Container>
    <SignupWrapper>
      <h2>MyRecipes</h2>
      <input
      type="text"
      placeholder="name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
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
          SignUP
      </button>
      <h2>
          <Link to="/signin">Login</Link>
      </h2>
      </SignupWrapper>
  </Container>
    );
}

export default Signup;
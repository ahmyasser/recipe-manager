import {useState,useEffect} from 'react'
import {Link,  useHistory} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {signup} from '../store/actions/userActions';

import "../Styles/Signup.css";

const Signup = ()=>{

    const history = useHistory();
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
   
    const state = useSelector(state => state);
    const dispatch = useDispatch(); 

    useEffect( () => { 
        if(state.signup.success)
            history.push("/signin")
    },[history, state]);
  
 
    return(
 <div className="container">
    <div className="signupWrapper">
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
      onClick={()=>signup(dispatch,email,password,name)}
      >
          SignUp
      </button>
      <h2>
          <Link to="/signin">Login</Link>
      </h2>
      </div>
  </div>
    );
}

export default Signup;
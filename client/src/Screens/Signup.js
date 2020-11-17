import {useState,useEffect} from 'react'
import {Link,  useHistory} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {signup} from '../store/actions/userActions';
import Error from '../Components/Error';


import "../Styles/Signup.css";

const Signup = ()=>{

    const history = useHistory();
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const {message,error} = useSelector(state => state.signup.data);
    const dispatch = useDispatch(); 

    useEffect( () => { 
        if(message)
            history.push("/signin")
        },[history,message,error]);
  
 
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
      <Error msg={error}/>

      </div>
  </div>
    );
}

export default Signup;
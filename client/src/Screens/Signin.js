import {useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux';
import "../Styles/Signin.css";

import {requestUser} from '../store/actions/userActions';

const Signin  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")

    const user = useSelector(state => state.requestUser.user);
    const dispatch = useDispatch(); 

    
    useEffect( () => { 
        if(user)
            history.push("/")
    },[history, user]);
    


   return (
      <div className="container">
          <div className="signinWrapper">
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
            onClick={()=>requestUser(dispatch,email,password)}
            >
                Login
            </button>
            <h2>
                <Link to="/signup">Sign Up</Link>
            </h2>
           
        </div>
      </div>
   )
}
  export default Signin;
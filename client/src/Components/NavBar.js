import  {useContext} from 'react';
import {Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = ()=>{
  
  const {state,dispatch} = useContext(UserContext)
   const renderList = ()=>{
    if(state){
        return [
          
          <Link className="navItem" to="/create" key={1}>Create</Link>
          ,<Link className="navItem" to="/signin"
         onClick={()=>{
           localStorage.clear()
           dispatch({type:"CLEAR"})
         }}
         key={2}
         >
             Logout
         </Link>
         
        ]
    }else{
      return [
        <Link className="navItem" to="/signin" key={3}>SignIn</Link>,
        <Link className="navItem" to="/signup" key={4}>SignUp</Link>
      ]
    }
  }

    return(
      <div className="container">
        <div className="navbarWrapper">
          <Link to={state?'/':'/signin'} id="logo">MyRecipes</Link>
          <div>
            {renderList()}          
          </div>
        </div>
      </div>
    );
}
export default Navbar;
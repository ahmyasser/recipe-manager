import {Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signout } from "../store/actions/userActions";

const Navbar = ()=>{
  const user = useSelector(state => state.requestUser.user);
  const dispatch = useDispatch();

   const renderList = ()=>{
    if(user){
        return [
          
          <Link className="navItem" to="/create" key={1}>Create</Link>
          ,<Link className="navItem" to="/signin"
         onClick={()=> dispatch(signout)}
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
          <Link to={user?'/':'/signin'} id="logo">MyRecipes</Link>
          <div>
            {renderList()}          
          </div>
        </div>
      </div>
    );
}
export default Navbar;
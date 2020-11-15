import  {useContext} from 'react';
import styled from "styled-components";
import {Link } from 'react-router-dom';
import { UserContext } from '../App';

import {Container} from '../style';

const Navbar = ()=>{
  

  const Wrapper = styled.div`
  width:900px;
  margin:40px;
  display:flex;
  justify-content:space-between;
  border-bottom:1px solid black; 
  & a {
    margin:10px;
    }
`;

  const {state,dispatch} = useContext(UserContext)
   const renderList = ()=>{
    if(state){
        return [
          
          <Link to="/create" key={1}>Create</Link>
          ,<Link to="/signin"
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
        <Link to="/signin" key={3}>SignIn</Link>,
        <Link to="/signup" key={4}>SignUp</Link>
      ]
    }
  }

    return(
      <Container>
      <Wrapper>
        <Link to={state?'/':'/signin'} className="brand-logo left">MyRecipes</Link>
        <div>
        {renderList()}          
        </div>
        </Wrapper>
    </Container>
    );
}
export default Navbar;
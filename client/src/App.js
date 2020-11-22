import {useEffect} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import "./App.css";

import NavBar from './Components/NavBar'
import Home from './Screens/Home'
import Post from './Screens/Post'
import Signin from './Screens/Signin'
import Signup from './Screens/Signup'
import CreatePost from './Screens/CreatePost'



const Routing = ()=>{

  const history = useHistory()
  const dispatch = useDispatch();
 
  useEffect(()=>{
    let user = localStorage.getItem("user")
    let token = localStorage.getItem("jwt")
    if(user)
        {
          console.log('here ' + user);
          dispatch({type:"REQUEST_USER_SUCCESS",payload:{user,token}})
          history.push('/')
      }
    else{
      history.push('/signin')
    }
  },[history,dispatch])

  return(
    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/create">
        <CreatePost/>
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/post/:post_id" >
      <Post />
      </Route>
      
    </Switch>
  )
}

const App=() => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
import {useEffect} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import "./App.css";

import NavBar from './Components/NavBar'
import Home from './Screens/Home'
import Post from './Screens/Post'
import Signin from './Screens/Signin'
import Signup from './Screens/Signup'
import CreatePost from './Screens/CreatePost'



const Routing = ()=>{

  const history = useHistory()

  const user = useSelector(state => state.requestUser.user);
 
  useEffect(()=>{

    if(user)
        {history.push('/')
      }
    else{
      history.push('/signin')
    }
  },[history,user])

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
import {useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import "./App.css";

import {reducer,initialState} from './reducers/userReducer'
import NavBar from './Components/NavBar'
import Home from './Screens/Home'
import Post from './Screens/Post'
import Signin from './Screens/Signin'
import Signup from './Screens/Signup'
import CreatePost from './Screens/CreatePost'

export const UserContext = createContext()


const Routing = ()=>{



  const history = useHistory()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
        history.push('/signin')
    }
  },[dispatch, history])
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
  const [state,dispatch] = useReducer(reducer,initialState)


  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
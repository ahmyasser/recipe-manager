import NavBar from './Components/NavBar'
import "./App.css"
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Screens/Home'
import Post from './Screens/Post'
import Signin from './Screens/Signin'
import Signup from './Screens/Signup'
import CreatePost from './Screens/CreatePost'


const Routing = ()=>{
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route exact path="/:post_id" >
      <Post />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/create">
        <CreatePost/>
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
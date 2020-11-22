import {useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'

import Card from '../Components/Card'
import Pending from '../Components/Pending'
import Error from '../Components/Error'
import {requestPosts} from '../store/actions/postActions'

import '../Styles/Home.css'

const Home  = ()=>{

    
    const {isPending, posts, error} = useSelector(state => state.requestPosts);
    const dispatch = useDispatch(); 
    
    useEffect(()=>{
         requestPosts(dispatch)        
    },[dispatch])


    if(isPending)   
        return <Pending/> 
    
    else    
    if(error)  
        return <Error msg={error}/> 
    else
        if(posts)
            return (
            <div className="homeWrapper">
                {
                    posts.map(item=>{
                    return(
                          <Card key={item._id} item={item} data={posts} />                           
                        )
                    })
                }
          </div>
          )
    
}
  
export default Home;
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { deletePost} from '../store/actions/postActions';


const Card  = ({item})=>{
    const dispatch = useDispatch(); 
   return (
            <div className="cardWrapper">
                <h1>
                    <Link to="" onClick={()=>deletePost(dispatch,item._id)}>Delete</Link>    
                </h1>
                <Link to={`/post/${item._id}`}>
                    <div>
                        <img src={item.pic} alt=""/>
                    </div>
                    <h1>{item.title}</h1>
                    <p><strong>Recipe:</strong> {item.recipe}</p>
                    <p><strong>ingredient:</strong> {item.ingredient} </p>
                </Link>
            </div>
   )                      
   
}
  
export default Card;
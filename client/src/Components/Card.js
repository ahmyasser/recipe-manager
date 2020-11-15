import {Link} from 'react-router-dom';


const Card  = ({deletePost,item})=>{

   return (
          item? 
            <div className="cardWrapper">
                <h1>
                    <Link to="" onClick={()=>deletePost(item._id)}>Delete</Link>    
                </h1>
                <Link to={`/post/${item._id}`}>
                    <div>
                        <img src={item.pic} alt=""/>
                    </div>
                    <h1>{item.title}</h1>
                    <p><strong>Recipe:</strong> {item.recipe}</p>
                    <p><strong>ingredient:</strong> {item.ingredient} </p>
                </Link>
            </div>: null
   )                      
   
}
  
export default Card;
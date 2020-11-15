import {Link} from 'react-router-dom';
import styled from 'styled-components';


const Card  = ({deletePost,item})=>{

    const CardWrapper = styled.section`
    margin:30px;
    width:50vh;
    height:70vh;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-end;
    border: 1px solid black;
    border-radius:10px;
    & h1 {
        text-transform: uppercase;
        & a{
            margin-right:10px;
            margin-bottom:10px;
        }
    }
    & img {
        height:200px;
        width:50vh;
    }
    & a {
        display:flex;
        flex-direction:column;
        & p {
            margin:10px;
        }
        & h1 {
            padding:5px;
            align-self:center;
        }
    }
  `;


   return (
          item? <div >
          <CardWrapper>
                            <h1 >
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
                              </CardWrapper>
                                </div>: null
   )                      
   
}
  
export default Card;
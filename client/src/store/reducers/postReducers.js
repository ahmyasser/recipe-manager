import * as constants from '../constants'

const intialStatePosts={
    isPending: false,
    posts:[],
    post:{},
    error:''
}
export const requestPosts = (state=intialStatePosts, action={})=>{
    switch (action.type) {
        case constants.REQUEST_POSTS_PENDING:
            return Object.assign({},state,{isPending:true});
            
        case constants.REQUEST_POSTS_SUCCESS:
            return Object.assign({},state,{isPending:false, posts:action.payload});
        
        case constants.REQUEST_POSTS_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});
        
        case constants.REQUEST_POST_PENDING:
            return Object.assign({},state,{isPending:true});
                
        case constants.REQUEST_POST_SUCCESS:
            return Object.assign({},state,{isPending:false, post:action.payload});
            
        case constants.REQUEST_POST_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});

        case constants.UPDATE_POST_PENDING:
            return Object.assign({},state,{isPending:true});
                    
        case constants.UPDATE_POST_SUCCESS:
            return Object.assign({},state,{isPending:false, post:action.payload});
                
        case constants.UPDATE_POST_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});
    
        case constants.DELETE_POST_PENDING:
            return Object.assign({},state,{isPending:true});
                
        case constants.DELETE_POST_SUCCESS:
            return Object.assign({},state,{isPending:false, 
                    posts: state.posts.filter(post=>{
                    return post._id !== action.payload
                })
            });
            
        case constants.DELETE_POST_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});
    
        case constants.CREATE_POST_PENDING:
            return Object.assign({},state,{isPending:true});
                    
        case constants.CREATE_POST_SUCCESS:
            return Object.assign({},state,{isPending:false, posts:[ ...state.posts, action.payload]});
                
        case constants.CREATE_POST_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});        
        default:
            return state;
    }
}


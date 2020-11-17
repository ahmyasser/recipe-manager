import * as constants from '../constants'

export const requestPosts= (dispatch)=>{
    dispatch({type:constants.REQUEST_POSTS_PENDING});
    fetch('/posts',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(response => response.json())
    .then(data =>dispatch({type:constants.REQUEST_POSTS_SUCCESS, payload:data.post}))
    .catch(error=> dispatch({type:constants.REQUEST_POSTS_FAILED, payload:error}))   
}

export const requestPost= (dispatch, postid)=>{
    dispatch({type:constants.REQUEST_POST_PENDING});
    fetch(`/getpost/${postid}`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(response => response.json())
    .then(data =>dispatch({type:constants.REQUEST_POST_SUCCESS, payload:data.post}))
    .catch(error=> dispatch({type:constants.REQUEST_POST_FAILED, payload:error}))   
}


export const deletePost = (dispatch,postid)=>{
    dispatch({type:constants.DELETE_POST_PENDING});
    fetch(`/post/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(response => response.json())
    .then(data =>dispatch({type:constants.DELETE_POST_SUCCESS, payload:data._id}))
    .catch(error=> dispatch({type:constants.DELETE_POST_FAILED, payload:error}))   
}


export const createPost = (dispatch,title,recipe,ingredient,pic)=>{
    dispatch({type:constants.CREATE_POST_PENDING});
    fetch("/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            recipe,
            ingredient,
            pic
        })
    })
    .then(response => response.json())
    .then(data => dispatch({type:constants.CREATE_POST_SUCCESS, payload:data.post}))
    .catch(error=> dispatch({type:constants.CREATE_POST_FAILED, payload:error}))   
}


export const updatePost = (dispatch,postid,title,recipe,ingredient,pic)=>{
    dispatch({type:constants.UPDATE_POST_PENDING});
    fetch(`/updatepost/${postid}`,{
        method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                recipe,
                ingredient,
                pic
            })
        })
    .then(response => response.json())
    .then(data =>dispatch({type:constants.UPDATE_POST_SUCCESS, payload:data.post}))
    .catch(error=> dispatch({type:constants.UPDATE_POST_FAILED, payload:error}))   
}

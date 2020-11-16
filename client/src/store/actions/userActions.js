import * as constants from '../constants'


export const requestUser= (dispatch,email,password)=>{
    dispatch({type:constants.REQUEST_USER_PENDING});
    fetch("/login",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password,
            email
        })
    })
    .then(response => response.json())
    .then(data =>{
        dispatch({type:constants.REQUEST_USER_SUCCESS, payload:data})
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",data.user);
    })
    .catch(error=> dispatch({type:constants.REQUEST_USER_FAILED, payload:error}))   
}


export const signup= (dispatch,email,password,name)=>{
    
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        
        dispatch({type:constants.SIGNUP_FAILED, payload:"Invalid Email"})
    
    else{
    fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email
        })
    })
    .then(response => response.json())
    .then(data =>dispatch({type:constants.SIGNUP_SUCCESS, payload:data}))
    .catch(error=> dispatch({type:constants.SIGNUP_FAILED, payload:error}))
}   
}

export const signout=(dispatch)=>{
    localStorage.clear();
    dispatch({type:constants.REQUEST_SIGNOUT})        
}
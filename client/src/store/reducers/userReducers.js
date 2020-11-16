import * as constants from '../constants'

const intialStateUser={
    isPending: false,
    user:null,
    error:''
}
export const requestUser = (state=intialStateUser, action={})=>{
    switch (action.type) {
        case constants.REQUEST_USER_PENDING:
            return Object.assign({},state,{isPending:true});
            
        case constants.REQUEST_USER_SUCCESS:
            return Object.assign({},state,{isPending:false, user:action.payload});
        
        case constants.REQUEST_USER_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});

        case constants.REQUEST_SIGNOUT:
            return Object.assign({},state,{isPending:false, user:null});
               
        default:
            return state;
    }
}


const intialStateSignup={
    success:false,
    error:''
}
export const signup = (state=intialStateSignup, action={})=>{
    switch (action.type) {    
        case constants.SIGNUP_SUCCESS:
            return Object.assign({},state,{success:true});
        
        case constants.SIGNUP_FAILED:
            return Object.assign({},state,{error:action.payload});
           
        default:
            return state;
    }
}
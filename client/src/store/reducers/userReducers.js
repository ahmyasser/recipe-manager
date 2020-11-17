import * as constants from '../constants'

const intialStateUser={
    isPending: false,
    user:{},
    error:''
}
export const requestUser = (state=intialStateUser, action={})=>{
    switch (action.type) {
        case constants.REQUEST_USER_PENDING:
            return Object.assign({},state,{isPending:true});
            
        case constants.REQUEST_USER_SUCCESS:
            return Object.assign({},state,{isPending:false, user:action.payload.user, error:action.payload.error});
        
        case constants.REQUEST_USER_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});

        case constants.REQUEST_SIGNOUT:
            return Object.assign({},state,{isPending:false, user:null});
               
        default:
            return state;
    }
}


const intialStateSignup={
    data: {},
    isPending:false,
    error:''
}
export const signup = (state=intialStateSignup, action={})=>{
    switch (action.type) {    
        case constants.SIGNUP_PENDING:
            return Object.assign({},state,{isPending:true});

        case constants.SIGNUP_SUCCESS:
            return Object.assign({},state,{isPending:false, data:action.payload});
        
        case constants.SIGNUP_FAILED:
            return Object.assign({},state,{isPending:false, error:action.payload});
           
        default:
            return state;
    }
}
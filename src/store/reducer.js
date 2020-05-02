export const fetchReducer =(state,action)=>{
    switch (action.type) {
      case "FETCH_SUCCESS":
         return {
            ...state,
            loading: false,
            data: action.payload
         };
      case "FETCH_FAILURE":
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
            
        default:
            return state
    }
}

export const authReducer = (state,action) =>{
   switch (action.type) {
       case "Register":
          return {
             ...state,
             isAuth:action.payload.isAuth
          }
       
      case "Authentication":
         return{
            ...state,
             isAuth:action.payload.isAuth
         }

      case "Login":
         return{
            ...state,
            isAuth:action.payload.isAuth
         }
       default:
           return state;
   }
}

export const cartReducer = (state, action) =>{
   switch (action.type) {
      case "FetchCart": 
         return {
            ...state,
            item:action.payload,
            length:action.payload.length
         }

      case "ActionCart":
         return {
            ...state,
            error:action.payload.error,
            variant:action.payload.variant,
            message:action.payload.message,
         }
      case "Redirect":
         return {
            ...state,
            redirect:action.payload
         }
   
      default:
         return state
   }
}
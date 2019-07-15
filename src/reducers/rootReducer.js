import { combineReducers } from 'redux';
// import general from './general';

let initialState={
    language: 'ar',
    isAdmin:false,
    isLoggedIn:false
}
function general (state = initialState, action) {
    switch (action.type) {
     case 'CHANGE_LANGUAGE':
        return {...state , language : action.payload}
    case 'LOGIN':
        console.log(action)
            let isAdmin=false;
            if(action.payload.indexOf('admin')>-1) isAdmin=true
            console.log('isAdmin',isAdmin)
            return {...state , isAdmin, isLoggedIn:true}
    case 'LOGOUT':
            return {...state , isLoggedIn:false, isAdmin:false}
     default:
      return state
    }
   }
export default combineReducers({
 general
});
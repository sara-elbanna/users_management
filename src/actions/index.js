export const changeLanguage = (lang) => dispatch => {
    dispatch({
     type: 'CHANGE_LANGUAGE',
     payload: lang
    })
   }
   export const login = (email) => dispatch => {
    dispatch({
     type: 'LOGIN',
     payload: email
    })
   }
   export const logout = () => dispatch => {
    dispatch({
     type: 'LOGOUT',
    })
   }

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import {changeLanguage} from './actions'
import {bindActionCreators} from 'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UsersList from './UsersList';
import Login from './Login';
import { withTranslation, Trans } from 'react-i18next';
import { logout } from './actions';
import { Redirect } from 'react-router'

// import i18n from "i18next";


// const resources = {
//   "en": {
//         translation: {
//           "delete":"deletezzzz",
//           "add new user":"add new user"
//         }
//       },
//       "ar": {
//         translation: {
//           "delete":"حذف",
//           "add new user":"اضافة مستخدم جديد"
//         }
//       }
// };

class App extends React.Component  {
  state={
    redirect:false
  }
  handleLogout=()=>{
    this.props.logout()
    this.setState({redirect:true},()=>{
      console.log(this.state)
    })
  }
  render(){
    const { t, i18n } = this.props;
  
    
  return (
    <div className="App">
      
      <div style={{textAlign:"left"}}>
            <button style={{width:'60px'}} onClick={()=>this.handleLogout()}>{t('logout')}</button>
      </div>
      <div className="lang_btns">
        <button onClick={() => i18n.changeLanguage('ar')}>ar</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
      </div>
      {/* <Trans i18nKey='welcome.intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
      </Trans> */}
      {/* {i18n.t('delete')}
      <button onClick={()=>this.handleLanguage()}>changeeeee lang</button> */}
     <Router>
     {this.state.redirect && <Redirect to="/login" />}
        <Route exact path="/" component={UsersList} />
        <Route exact path="/login" component={Login} />
     </Router>
      
    </div>
  );
}
}

const mapStateToProps = state => ({
  ...state
 })
 const mapDispatchToProps = dispatch => ({
  changeLanguage: () => dispatch(changeLanguage()),
  logout: () => dispatch(logout())
 })
//  const mapDispatchToProps = (dispatch) =>({
//   ...bindActionCreators({
//     bla_action: bla_action
//   },dispatch)
// })
export default connect(mapStateToProps, mapDispatchToProps) (withTranslation('common')(App)) ;

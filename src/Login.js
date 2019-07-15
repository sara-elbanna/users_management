import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './UsersList';
import { connect } from 'react-redux';
import {login} from './actions'
import {bla_action} from './actions'
import { Route, Redirect } from 'react-router'
import { withTranslation} from 'react-i18next';

class Login extends React.Component  {
    state={
        email:'',
        redirect: false
    }
    handleLogin=()=>{
        this.props.login(this.state.email)
        this.setState({redirect: true})
    }
    render(){
        console.log(this.props)
    return (
        <div className="login">
            {this.state.redirect && <Redirect to="/" />}
            <h1>{ this.props.t('login')}</h1>
            <p>login with this email <b>admin@app.com </b> to get access to control all system</p>
            <input type='email' placeholder='email' onChange={(e)=>this.setState({email:e.target.value})}/>
            <button onClick={()=>this.handleLogin()}>login</button>
        </div>
    );
    }
}

const mapStateToProps = state => ({
  ...state
 })
 const mapDispatchToProps = dispatch => ({
    login: (mail) => dispatch(login(mail))
 })
export default connect(mapStateToProps, mapDispatchToProps)  (withTranslation('common')(Login)) ;

import React  from 'react';
import './App.css';
import {USERS_DATA} from './Users_data'
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { withTranslation } from "react-i18next";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux';
class Users extends React.Component  {
    state={
        users_data: USERS_DATA,
        name:'',
        email:'',
        phone:'',
        Status:'',
        validName:true,
        validPhone:true,
        validMail: true,
        addNew:false,
        editUser:null,
        
    }
   


    deleteUser=(id)=>{
        let new_data = this.state.users_data.filter(user=> user.id != id)
        this.setState({users_data: new_data},()=>{
            NotificationManager.success('deleted successfully');
        })
        
    }
    editUser=(id)=>{
        let user = this.state.users_data.find(user => user.id == id)
        console.log(user.email)

        this.setState({name:user.name, email:user.email, phone:user.phone, Status:user.Status, editUser:id})
    }
    generateTableData=()=>{
        let data =[];
        this.state.users_data.forEach((user)=>{
                let row ={};
                row['name'] = user.name
                row['phone'] = user.phone
                row['email'] = user.email
                row['status'] = user.Status
                row['id'] = user.id
                data.push(row);
        })
        return data;
    }
    generateTableColumns = ()=>{
        console.log('ffffffff',this.props)
        let columns = [{
            Header: 'Name',
            accessor: 'name' ,
          },
          {
            Header: 'Phone',
            accessor: 'phone' ,
          },
          {
            Header: 'Email',
            accessor: 'email' ,
          },
          {
            Header: 'Status',
            accessor: 'status' ,
          }
          ,
          {
            Header: '', 
            Cell : props => (
                <div>
                    {this.props.general.isAdmin && <button onClick = {()=>this.editUser(props.original.id)} className='btn '>Edit</button>}
                    {this.props.general.isAdmin &&<button onClick = {()=>this.deleteUser(props.original.id)} className='btn'>delete</button>}
                    {!this.props.general.isAdmin && <span style={{color:'red'}}>Only Admin can edit or delete</span>}
                </div>
            )
          }
        ]
        return columns;
    }
    handleNameChange=(e)=>{
        let validName =true
        if(!e.target.value) validName =false
         this.setState({name:e.target.value, validName})
    }
    handlePhoneChange=(e)=>{
        let phone = e.target.value
        let validPhone = true;
        if(!phone || phone.length != 10 ) validPhone =false
        this.setState({phone:e.target.value, validPhone})
    }
    handleemailChange=(e)=>{
        let email = e.target.value
        let validMail = true;
        if(!email  || email.indexOf('@') == -1  || email.indexOf('.com') == -1 ) validMail=false
        this.setState({email, validMail})
    }
    handleStatusChange=(e)=>{
        this.setState({Status:e.target.value})
    }
    handleNewUser=()=>{
        let{name,phone,email,Status} = this.state
        let newUsers=[...this.state.users_data,{name,phone,email,Status, id:this.state.users_data.length+1}]
        this.setState({users_data : newUsers, addNew:false},()=>{
            NotificationManager.success('User added successfully');
        })
    }
    handleEditUser=()=>{
        let{name,phone,email,Status} = this.state
        let newUsers = this.state.users_data.filter(user=> user.id != this.state.editUser)
        newUsers = [...newUsers, {name,phone,email,Status, id:this.state.editUser}]
        this.setState({users_data : newUsers, editUser:false},()=>{
            NotificationManager.success('done');
        })
    }
   
    render(){
    let columns = this.generateTableColumns();
    let data = this.generateTableData();
    const {t} =this.props
    return (
    <div className="Users">  
        <h1>{t('Users List')}</h1>
        <div style={{textAlign:"right"}}>
            <button onClick={()=>this.setState({addNew:true})}>{t('Add new User')}  </button>
        </div>
        <div>           
            {this.state.addNew && <form className='form'>
                <div>
                    <input  placeholder='Name' type='text' onChange={this.handleNameChange}/>
                    {!this.state.validName && <p>Name is required</p> }
                </div>
                <div>
                    <input placeholder='Phone' type='tel' onChange={this.handlePhoneChange}/>    
                    {!this.state.validPhone && <p>Phone is not valid</p> }
                </div>
                <div>
                    <input placeholder='Email' type='email' onChange={this.handleemailChange}/>
                    {!this.state.validMail && <p>Mail is not valid</p> }
                </div>
                
                <select onChange={this.handleStatusChange}>
                <option value=''></option>
                    <option value='active'>active</option>
                    <option value='soft_deleted'>soft_deleted</option>
                </select>
                <button onClick={this.handleNewUser}>Add</button>
            </form>}

            {this.state.editUser && <form className='form'> 
                <div>
                    <input value={this.state.name} placeholder='Name' type='text' onChange={this.handleNameChange}/>
                    {!this.state.validName && <p>Name is required</p> }
                </div>
                <div>
                    <input value={this.state.phone} placeholder='Phone' type='tel' onChange={this.handlePhoneChange}/>    
                    {!this.state.validPhone && <p>Phone is not valid</p> }
                </div>
                <div>
                    <input value={this.state.email} placeholder='Email' type='text' onChange={this.handleemailChange}/>
                    {!this.state.validMail && <p>Mail is not valid</p> }
                </div>
                
                <div><select value={this.state.Status} onChange={this.handleStatusChange}>
                    <option value=''></option>
                    <option value='active'>active</option>
                    <option value='soft_deleted'>soft_deleted</option>
                </select>
                {!this.state.Status && <p>Status is required</p> }
                </div>
                <button onClick={this.handleEditUser}>Edit</button>
            </form>}
        </div>
        <ReactTable
                className='-striped -highlight'
                defaultPageSize={2}
                data={data}
                columns={columns}
                filterable
                // defaultFilterMethod={(filter, row)=>filterMethod(filter, row)}
            />
        <NotificationContainer/>
    </div>
  );
}
}

const mapStateToProps = state => ({
    ...state
   })
   const mapDispatchToProps = dispatch => ({
      
   })
  export default connect(mapStateToProps, mapDispatchToProps) (withTranslation('common')(Users));
//   export default  withTranslation('common')(Users);

import {Component} from "react"
import {Navigate} from "react-router-dom";

import "./index.css"

class RegisterPage extends Component {

    state = {
        name : "", 
        address: "",
        data: [],
        redirect : false,
        showError:false,
        errorMsg:""
    }

   

    
    getName = (event)=> {
        this.setState({name:event.target.value})
    }

    getAddress = (event)=> {
        this.setState({address:event.target.value})
    }

    submitForm = async(e)=> {
        e.preventDefault()
        const {name,address} = this.state
        const userDetails = {name,address}
        console.log(userDetails)
        const url =`https://smoke-trees-assessment.onrender.com/api/register`
        const options = {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        console.log(response)
        console.log(data)
        if (response.ok === true) {
               this.setState((prevState)=> ({
                data:[...prevState.data,data], redirect:true
               }))
        } 
        else {
            this.setState({showError:true, errorMsg:data.message})


        }
        
    }

    render(){
        const {data,name,address,redirect,errorMsg,showError} = this.state 
        console.log(name,address,errorMsg,data)

        if (redirect) {
            return <Navigate to = "/" />
        }
        return (
            <div className="main-container">
            <form onSubmit={this.submitForm}>
                <div className="input-label-containr">
                    <label className="label" >Name:</label> 
                    <input type ="text" placeholder="Enter Name" onChange={this.getName} name= "name" value = {name} required  /> 
                </div>
                <br/>
                <div className="input-label-containr">
                    <label className="label">Address:
                    </label>
                    <input type="text" placeholder="Enter Address" onChange={this.getAddress} name="address" value={address} required />
               </div>
                <br/>
                <button className="button-style" type="Submit"> Add User and Address</button>
                {showError && <p className="error-msg">{errorMsg}</p>}
            </form>
            
            </div>
        )
    }
}


export default RegisterPage
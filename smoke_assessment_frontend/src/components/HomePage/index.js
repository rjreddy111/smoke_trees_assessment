import { Component } from "react";
import { Navigate } from "react-router-dom";
import "./index.css"

class HomePage extends Component {

    state = {fetchedData : [],
        redirect:false
    }

    componentDidMount() {
        this.getData()
    }

    getData = async()=> {
        const url = "https://smoke-trees-assessment.onrender.com/api"
        const response = await fetch (url) 
        const data  =await  response.json()
        this.setState({fetchedData:data.data})
    }
   
    getAddButton = ()=> {
        this.setState({redirect:true})

    }


    render(){
        const {fetchedData,redirect} = this.state 
        console.log(fetchedData)
        if (redirect) {
            return <Navigate to = "/register" />
        }
        
        return (
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>

                </thead>
                <tbody>
                    {fetchedData.map((eachData)=> (
                        <tr key = {eachData.addressId}>
                            <td>{eachData.name}</td>
                            <td>{eachData.address}</td>

                        </tr>
                    ))}
                </tbody>

               
            </table>
            <button className="button-style" onClick={this.getAddButton}>Add more User and Address</button>
            </div>
        )
    }
}


export default HomePage
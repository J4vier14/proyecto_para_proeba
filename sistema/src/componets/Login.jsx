import React,{ useState }  from 'react';

import '../assetss/css/login.css';

//importar servicio
import {apiurl} from '../services/apirest';
import axios from 'axios';



class Login extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        form:{
            "CORREO": "",
            "PASSWORD_ADMIN": ""
        },
        error: false,
        errorMsg: ""
    }

    manejadorsubmit = e=>{
        e.preventDefault();
    }
    
    //definiendo manejador
    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        })

       
    }

    manejadorBoton=()=>{
        let url = apiurl + "api/login";
        if(this.state.form.CORREO === "" ){
            
        }else if(this.state.form.PASSWORD_ADMIN != ""){
            axios.post(url, this.state.form)
            .then(response =>{
                if(response.status === 200){

                    console.log(response);
                    console.log(response.data[0].NOMBRE_ADMIN);
                    localStorage.setItem("SESSION", "true")
                    this.props.history.push("/contenedor");
                    window.location.reload();
                }
                if(response.status === 201){
                    this.setState({
                        error : true,
                        errorMsg : "Usuario ó contraseña incorrecta"
                    })
                    console.log(response);
                }
            })
        } 
        
    }

    render() {
        return(
          <React.Fragment>
               <br/>
              <div className="wrapper fadeInDown">
                <div id="formContent">
                    
                    <div class="fadeIn first">
                        <br/>
                    <img src="https://i.ibb.co/yVGxFPR/2.png" id="icon" alt="User Icon" />
                    </div>

                    
                    <form onSubmit={this.manejadorsubmit}>
                    <input type="email" id="CORREO" className="fadeIn second" name="CORREO" placeholder="Correo" onChange={this.manejadorChange} required/>
                    <input type="password" id="PASSWORD_ADMIN" className="fadeIn third" name="PASSWORD_ADMIN" placeholder="password" onChange={this.manejadorChange} required/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton}/>
                    </form>

                    
                    {this.state.error  === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    }
                    
                    

                </div>
                </div>
          </React.Fragment>
        );
    }
}

export default Login;
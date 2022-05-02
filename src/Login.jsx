import {fetchLogin} from "./services";
import {useState, useEffect} from "react";

function Login({setLogin, setErrMsg, setUsername}){
const[loginUser,setLoginUser]=useState();
const[disableButton, setDisableButton] = useState(true);

useEffect(()=>{
  setUsername(loginUser)
},[setUsername,loginUser]);

    function onLogin(){
        fetchLogin(loginUser)
        .then(()=>{
            setLogin(true);
            console.log('here',document.querySelector('.login-button'));
        })
        .catch(err=>{
            setErrMsg(err.error);
            setLogin(false);
        })
    };

    return(
        <div className="login">

     
  
                <div className="logo">
        
                    SalesAdmin
                  
                </div>
  
                <div className="login-card">
  
                <div className="login-group">
  
                    <div className="login-info">
                      <h5 className="login-title">Login to Your Account</h5>
                      <p className="text-center small">Enter your username to login</p>
                    </div>

  
                      <div >
                        <label  className="form-label">Username</label>
                          <span className="input-group-text" id="inputGroupPrepend">@
                          <input type="text" onChange={e => {
                            setLoginUser(e.target.value);
                            setDisableButton(false);
                          }
                            } className="form-control" id="yourUsername" required />
                          </span>
                       
                   
                      </div>
  
                     
                      <div >
                        <button className="login-button" type="button" onClick={()=>onLogin()} disabled={disableButton}>Login</button>
                      </div>
            
                      </div>
                </div>
     
          
  
  
      </div>
    )
}
export default Login;
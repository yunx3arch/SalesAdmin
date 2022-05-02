import './App.css';
import { useEffect, useState} from 'react';
import {fetchSession} from './services';
import Sales from './Sales';
import Login from './Login';
import Logout from './Logout';
import Header from './Header';

const MESSAGES = {
  networkError: 'Trouble connecting to the network.  Please try again',
  default: 'Something went wrong.  Please try again',
};
function App() {
  const [login, setLogin] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const[username, setUsername] = useState();

  useEffect( () => {
    fetchSession()
    .then( () => {
      setLogin(true);
    })
    .catch( err => {
        setLogin(false);
        const key = err? err.error:'default';
        setErrMsg(MESSAGES[key]);
    })
    },
    [login]
);

  return (
    <div className='App'>
     {!login && <Login setLogin={setLogin} setErrMsg={setErrMsg} setUsername={setUsername}/> }
  
     {login && <Header username={username}/>}
 
   
     {login && <Sales setLogin={setLogin} setErrMsg={setErrMsg}/>}
     {login && <Logout setLogin={setLogin}/>}
     {errMsg!=='' && <div className='error-msg'>{errMsg}</div>}

</div>
  );
}

export default App;
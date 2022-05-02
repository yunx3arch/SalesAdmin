import { fetchLogout } from "./services";

function Logout({setLogin}){
    function OnLogout(){
        fetchLogout()
        .then(()=>{
            setLogin(false);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return(
        <div className="logout">
            <button className='logout-button' type="button" onClick={()=>OnLogout()}>Logout</button>
        </div>
    )
}

export default Logout;
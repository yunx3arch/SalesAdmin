function Header(username){
    return(
        <div className="header-app" >
            <div className="logo-left">
        
        SalesAdmin
      
    </div>
     <div className="user-name">Hello, {username.username}</div>
       
        </div>
    )
}
export default Header;
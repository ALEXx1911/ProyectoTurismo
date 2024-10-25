import Profile_Box from "./Profile_Box";

type headerProps={
    logo:string;
}

export default function header({logo}:headerProps){
    return(
        <div className="header">
            <div className="header__logo-container">
               <img src={logo} alt="" sizes=""/>
            </div>
            <div className="header__search-bar">
                <Profile_Box>
                    
                </Profile_Box>
            </div>
        </div>
    );
}
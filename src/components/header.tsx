import { ReactNode } from "react";

type headerProps={
    logo:ReactNode;
}

export default function header({logo}:headerProps){
    return(
        <div className="header">
            <div className="header__logo-container">
                {logo}
            </div>
            <div className="header__search-bar">
                
            </div>
        </div>
    );
}
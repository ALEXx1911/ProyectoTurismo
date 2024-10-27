import { useState } from "react";

type MenuProps={
    active:boolean;
}
export default function Menu({active}:MenuProps){
    if(active){
        const [visible,setVisible]=useState(true);
        function handleClick(){

        }

        return(
            <div className="options">
                <li className="options__list">
                    <button>Login</button>
                    <button>Settings</button>
                </li>
            </div>
        );
    }
}
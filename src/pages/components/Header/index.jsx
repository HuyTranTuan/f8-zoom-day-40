import { NavLink } from "react-router-dom";

import Button from "@/components/Button";
import types from "./Header.module.scss";

function Header() {
    const url = window.location.href;
    return (
        <header className={types.wrapper}>
            <div className={types.function}>
                <NavLink to={`/`}>
                    <Button children={
                        <span>React-Redux</span>
                    } rounded sm primary />
                </NavLink>
                <Button href={`${url}/redux.html`} children={
                    <span>Redux</span>
                } rounded sm danger />
            </div>
        </header>
    )
}

export default Header;
import { NavLink } from "react-router-dom";

import Button from "@/components/Button";
import types from "./Header.module.scss";

function Header() {
    return (
        <header className={types.wrapper}>
            <div className={types.function}>
                <NavLink to={`/`}>
                    <Button children={
                        <span>React-Redux</span>
                    } rounded sm primary />
                </NavLink>
                <Button href="http://localhost:5173/f8-zoom-day-40/redux.html" children={
                    <span>Redux</span>
                } rounded sm danger />
            </div>
        </header>
    )
}

export default Header;

import { FC } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

export const Navbar: FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('loginToken')
        navigate(`/login`, { replace: true });
        location.reload();
    }

    return (
        <>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink className="navbar-item" to={"/"}>Dashboard</NavLink>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-light" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar
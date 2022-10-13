import { NavLink } from "react-router-dom"


export default function Navbar() {
   

    return(
    <nav className="flex justify-between">
        <p>logo</p>
        <ul className="flex gap-6">
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li>
                <NavLink to='/services'>Services</NavLink>
            </li>
            <li>
                <NavLink to='/faq'>FAQ</NavLink>
            </li>
            <li>
                <NavLink to='/login'>Log in</NavLink>
            </li>
            <li>
                <NavLink to='/register'>Sign up</NavLink>
            </li>
        </ul>
    </nav>
    )   
}

import { Link, NavLink } from "react-router-dom"


export default function Navbar(props) {
    const { user, isAuth } = props.auth
    const { logout } = props

    return (
        <nav className="flex justify-between">
            <p>logo</p>
            {user &&
                <div>
                    <p>Hi {user.fullname}</p>
                </div>
            }
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

                {!isAuth && <>
                    <li>
                        <NavLink to='/login'>Log in</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>Sign up</NavLink>
                    </li>
                </>
                }
                {
                    isAuth && <>
                                  <li>
                                    <Link to="/">Manage</Link>
                                  </li>
                                  <li>
                                    <Link to="/services/new">Create Service</Link>
                                  </li>
                                  <li>
                                    <Link to="/services/my">Your Service</Link>
                                 </li>
                        <button onClick={logout}>Logout</button>
                    </>
                }
            </ul>
        </nav>
    )
}

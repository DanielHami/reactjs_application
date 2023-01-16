import Navbar from "components/header/Navbar";
import Home from "pages/Home";
import Footer from "components/footer/Footer";
import { Route, Routes} from 'react-router-dom'
import Profile from "pages/Profile";
import Services from "pages/Services";
import ServiceDetail from "pages/ServiceDetail";
import Faq from "pages/Faq";
import Login from "pages/Login";
import Register from "pages/Register";
import  NotFound  from "pages/NotFound";
import SecretPage from "pages/Hide";
import React from "react";
import CreateServices from "pages/services/createServices";
import UserServices from "pages/UserServices";
import { connect } from "react-redux"
import {logout} from "actions"
import Spinner from "components/spinner/Spinner";


class ServiceApp extends React.Component {

    handleLogout = () => this.props.dispatch(logout())

    renderApplication() {
        return (
            <React.Fragment>
                <Navbar id="navbar-main" auth={this.props.auth} logout={this.handleLogout} />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/services/my" element={<UserServices/>} />
                    <Route path="/services/new" element={<CreateServices />} />
                    <Route path="/services/:serviceId" element={<ServiceDetail />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/faq" element={<Faq />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />}></Route>
                    <Route path="/secret" element={<SecretPage />}></Route>
                   </Routes>
                <Footer/>
            </React.Fragment>
        )
    }

    render() {
        const {auth} = this.props
        return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner/>
    }
}

const mapState = state => ({auth: state.auth})
export default connect(mapState)(ServiceApp)
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
import React from "react";
import { connect } from "react-redux"
import {logout} from "actions"


class ServiceApp extends React.Component {

    handleLogout = () => this.props.dispatch(logout())

    renderApplication() {
        return (
            <React.Fragment>
                <Navbar auth={this.props.auth} logout={this.handleLogout} />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/services/:serviceId" element={<ServiceDetail />}></Route>
                    <Route path="/services" element={<Services />}></Route>
                    <Route path="/faq" element={<Faq />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />}></Route>
                   </Routes>
                <Footer/>
            </React.Fragment>
        )
    }

    render() {
        return this.renderApplication()
    }
}

const mapState = state => ({auth: state.auth})
export default connect(mapState)(ServiceApp)
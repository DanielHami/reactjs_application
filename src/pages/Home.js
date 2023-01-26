import ServiceItem from "components/services/ServiceItem";
import {connect } from "react-redux"; //osszekapcsolas a funkciokat
import {fetchServices} from 'actions'
import React from "react";



class Home extends React.Component {

    state = { 
        services: []
    }
 
    componentDidMount() {
        this.props.fetchServices()
    }
    
    renderServices = (services) => services.map(service => <ServiceItem key={service.id} service = {service}/>)
    render() {
        const {services} = this.props
    
    
    return (
        <div>
           {this.renderServices(services)}
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        services: state.services.items
    }
}

export default connect(mapStateToProps, {fetchServices})(Home)
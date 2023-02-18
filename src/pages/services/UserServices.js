import { fetchUserServices } from "actions"
import withAuthorization from "components/hoc/withAuthorization"
import ServiceItem from "components/services/ServiceItem"
import React from "react"

class UserServices extends React.Component {
   
    componentDidMount() {
        const {auth: {user}, dispatch} = this.props
        dispatch(fetchUserServices(user.uid))
    }

    render() {
        const {services} = this.props.auth.user

    return (
        <div>
            <div>
                <div>
                   {
                    services.map(props => (
                        <div key={props.id}>
                            <ServiceItem service={props}/>
                        </div>
                    )
                    )
                   }
                </div>
            </div>
        </div>
    )
    }

}

export default withAuthorization(UserServices)
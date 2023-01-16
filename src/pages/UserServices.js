import { fetchUserServices } from "actions"
import withAuthorization from "components/hoc/withAuthorization"
import React from "react"

class UserServices extends React.Component {
   
    componentDidMount() {
        const {auth: {user}} = this.props
        fetchUserServices(user.uid).then(services => {
            alert(JSON.stringify(services))
        })
    }

    render() {
    return (
        <div>
            <div>
                <div>
                   <p>My services</p>
                </div>
            </div>
        </div>
    )
    }

}

export default withAuthorization(UserServices)
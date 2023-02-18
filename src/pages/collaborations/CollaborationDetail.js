import React from "react";
import { connect } from "react-redux";
import withAuthorization from "components/hoc/withAuthorization";

class CollaborationDetail extends React.Component {
    render() {
        return (
            <div>
             <p>collaboration messages</p>
            </div>
        )
    }
}

export default withAuthorization(CollaborationDetail)
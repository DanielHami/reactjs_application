import withAuthorization from "components/hoc/withAuthorization";
import React from "react";
import { fetchCollaborations } from "actions";
import moment from "moment/moment";
import { Link } from "react-router-dom";

class RecievedCollaboration extends React.Component {

    state = {collaborations: []}
    
    componentDidMount() {
      const {auth: {user}} = this.props
      fetchCollaborations(user.uid)
      .then(collaborations =>
        this.setState({collaborations}))
    }
    
    render() {
      const {collaborations} = this.state
      return (
       <>
       <div>
        <h1 className="text-xl">Collaborations</h1>
       </div>
       <div>
        {
          collaborations.map(collaboration => (
            <div key={collaboration.id}>
              <div>
                <p>{collaboration.title}</p>
              </div>
              <div>
                <img src={collaboration.image} alt={collaboration.title}/>
              </div>
              <div>
                <p>
                  <span>{collaboration.fromUser.name}</span> replied {moment(collaboration.createdAt.toDate()).fromNow()} &nbsp;
                  <span>{collaboration.status}</span>
                </p>
              </div>
              <div>
                <Link to={`/collaborations/${collaboration.id}`}>
                  <button>Enter</button>
                </Link>
              </div>
            </div>
          ))
        }
       </div>
       </>
      )
    }
}

export default withAuthorization(RecievedCollaboration)
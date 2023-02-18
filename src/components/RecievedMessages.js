import { connect } from "react-redux"
//import { getMessages } from "reducers"
import { markMessageAsRead } from "actions"
import { useNavigate } from "react-router-dom"


const RecievedMessages = ({messages}) => {
    
    const navigate = useNavigate()

    const handleMessageAsRead = message => {
      markMessageAsRead(message)
    }

    const goToCollabortion = message => {
      markMessageAsRead(message)
      navigate(message.cta)
    }

      const filteredMessage = messages.filter(m => !m.isRead).map(message => (
        <div key={message.id}>
          <div>
            <span>From: </span> {message.fromUser.name}
          </div>
          <div>
            <p>{message.text}</p>
          </div>
          <div>
            <button onClick={() => goToCollabortion(message)}>Join</button>
          </div>
          <div>
            <button onClick={() => handleMessageAsRead(message)}>Later</button>
          </div>
        </div>
      )
      )
        if(filteredMessage.length === 0) {
          return <div>No messages</div>
        }
    return filteredMessage
}


const mapStateToProps = (state) => ({messages: state.auth.user.messages})

export default connect(mapStateToProps)(RecievedMessages)
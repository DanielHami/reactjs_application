import { fetchSentOffers, collaborate } from "actions";
import { newCollaboration, newMessage } from "collaboration/offers";
import withAuthorization from "components/hoc/withAuthorization";
import ServiceItem from "components/services/ServiceItem";
import React from "react";
import { connect } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

class SentOffers extends React.Component {
  
  componentDidMount() {
    const { auth } = this.props
    this.props.dispatch(fetchSentOffers(auth.user.uid))
  }
  
  createCollaboration = offer => {
    const {auth: {user}} = this.props
    const collaboration = newCollaboration({offer, fromUser: user})
    const message = newMessage({offer, fromUser: user})
  
    this.props.collaborate({collaboration, message})
    .then(_ => {
      toast.success('Collaboration was created!')
  })
  }

  render() {
    const { offers } = this.props
    return (
      <div>
        <div>
          <h1>Sent Offers</h1>
          
          {offers.map(offer => (
            <div key={offer.id}>
              <ServiceItem service = {offer.service}>
              <div>
                {offer.status}
              </div>
              <div>
                <span>To User:</span>{offer.toUser.fullname}
              </div>
              <div>
                <span>Note:</span>{offer.note}
              </div>
              <div>
                <span>Price:</span>{offer.price}
              </div>
              <div>
                <span>Time:</span>{offer.time}
              </div>
              { offer.status === 'accepted' && !offer.collaborationCreated &&
              <div>
                <button 
                      onClick={() => this.createCollaboration(offer)}>Collaborate
                </button>
              </div>
              }
              </ServiceItem>
            </div>
          ))
          }
        </div>
        <Toaster position="top-right"
                 reverseOrder={false}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    offers: state.offers.sent
  }
}

export default withAuthorization(connect(mapStateToProps, {collaborate})(SentOffers))
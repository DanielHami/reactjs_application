import { fetchRecievedOffers, acceptOffer, declineOffer } from "actions";
import withAuthorization from "components/hoc/withAuthorization";
import ServiceItem from "components/services/ServiceItem";
import React from "react";
import { connect } from "react-redux";

class RecievedOffers extends React.Component {

  componentDidMount() {
    const {auth} = this.props
    this.props.fetchRecievedOffers(auth.user.uid)
  }

  acceptOffer = offer => {
    this.props.acceptOffer(offer)
  }

  declineOffer = offer => {
    this.props.declineOffer(offer)
  }
  statusClass = state => {
    if(state === 'pending'){ return 'bg-yellow-500'}
    if(state === 'accepted'){ return 'bg-green-500'}
    if(state === 'declined'){ return 'bg-red-500'}
  }
  render() {
    const {offers} = this.props
    return (
     <div>
      <div>
        <h1>Recieved Offers</h1>
      </div>
      { offers.map(offer => (
       <div key = {offer.id}>
       <ServiceItem service = {offer.service}>
       <div className={`${this.statusClass(offer.status)}`}>
                {offer.status}
              </div>
              <div>
                <span>To User:</span>{offer.fromUser.fullname}
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
              { offer.status === 'pending' &&
              <div>
                <hr/>
                <div>
                  <button onClick={() => this.acceptOffer(offer.id)} className="text-green-500">Accept</button>
                </div>
                <div>
                  <button onClick={() => this.declineOffer(offer.id)} className="text-red-500">Decline</button>
                </div>
              </div>
              }
          </ServiceItem>
       </div>
      ))
      }
     </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    offers: state.offers.received
  }
}

const mapDispatchToProps = () => ({
  acceptOffer, 
  declineOffer, 
  fetchRecievedOffers
})

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps())(RecievedOffers))
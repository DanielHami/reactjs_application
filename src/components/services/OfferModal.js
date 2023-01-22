import Modal from "components/modals/Modal"
import { useState } from "react"

const OfferModal = service => {

    const [offer, setOffer] = useState({
        fromUser: '',
        toUser: '',
        service: '',
        status: 'pending',
        price: 0,
        time: 0,
        note: ''
    })
     
     const handleChange = ({target: {value, name}}) => {
        if(name === 'time') {
            const price = Math.round(value * service.service.price * 100) / 100
            debugger
            return setOffer({...offer, [name]: value, price})
        }
        return setOffer({...offer, [name]: value})
     }

     const handleSubmit = () => {
        alert(JSON.stringify(offer))
     }
    return (
        <Modal onModalSubmit={handleSubmit}>
            <form className='flex flex-col'>
                <label>Write some note</label>
                <input 
                  name="note"
                  onChange={handleChange}
                  type="text"
                  className='border-2'>

                </input>
                <label>How long you need service for</label>
                <input 
                  name="time"
                  onChange={handleChange}
                  type="number"
                  className='border-2'>
                </input>
            </form>
            <p>Price: {offer.price}$</p>
        </Modal>

    )
}

export default OfferModal
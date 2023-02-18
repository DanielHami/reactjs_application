import Modal from "components/modals/Modal"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { createOffer } from "actions";

const OfferModal = ({service, auth}) => {


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
            const price = Math.round(value * service.price * 100) / 100
            
            return setOffer({...offer, [name]: value, price})
        }
        return setOffer({...offer, [name]: value})
     }

     const handleSubmit = () => {

        const copyOffer = {...offer}

        copyOffer.fromUser = auth.user.uid
        copyOffer.toUser =  service.user.uid
        copyOffer.service = service.id
        copyOffer.time = parseInt(offer.time, 10)
        createOffer(copyOffer)
        .then(_ => {
            toast.success('Your offer is sended')
        })
        
     }
     
    return (
        <>
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
            <div>
                {service.user && `Uppon acceptance ${service.user.fullname}`}
            </div>
            <p>Price: {offer.price}$</p>
        </Modal>
        <Toaster position="top-right"
                 reverseOrder={false}/>
        </>
    )
}

export default OfferModal
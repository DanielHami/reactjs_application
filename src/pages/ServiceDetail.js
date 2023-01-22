import { useParams } from "react-router-dom"
import {connect} from 'react-redux'
import { useEffect } from "react"
import { fetchById } from "actions"
import OfferModal from "components/services/OfferModal"


   
function ServiceDetail(props) {
    const {serviceId} = useParams()
    const {dispatch} = props

    useEffect(() => {
        dispatch(fetchById(serviceId))
    },[serviceId, dispatch])

    const {service} = props
    
    return (
     <div>
        <h1>{service.title}</h1>
        <p>{service.image}</p>
        <p>{service.description}</p>
        <p>{service.price}</p>
        <OfferModal service={service}/>
     </div>
    )
}
const mappingProps = state => {
     return {
        service: state.selectedService.item
     }
}

export default connect(mappingProps)(ServiceDetail)
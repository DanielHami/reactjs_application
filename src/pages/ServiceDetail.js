import { useParams } from "react-router-dom"
import {connect} from 'react-redux'
import { useEffect } from "react"
import { fetchById } from "actions"
import OfferModal from "components/services/OfferModal"


   
function ServiceDetail(props) {
    const {serviceId} = useParams()
    const {fetchById} = props

    useEffect(() => {
        fetchById(serviceId)
    },[serviceId, fetchById])

    const {services, auth} = props
    
    

    return (
     <div>
        <h1>{services.title}</h1>
        <p>{services.image}</p>
        <p>{services.description}</p>
        <p>{services.price}</p>
        <OfferModal 
        auth = {auth}
        service={services}/>
     </div>
    )
}
const mappingProps = ({selectedService, auth}) => {
     return {
        services: selectedService.item,
        auth
        
     }
}

export default connect(mappingProps, {fetchById})(ServiceDetail)
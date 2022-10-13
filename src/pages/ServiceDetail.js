import { useParams } from "react-router-dom"
import {connect} from 'react-redux'
import { useEffect } from "react"
import { fetchById } from "actions"


   
function ServiceDetail(props) {
    const {serviceId} = useParams()
    const {dispatch} = props

    useEffect(() => {
        dispatch(fetchById(serviceId))
    },[serviceId, dispatch])

    const {service} = props
    
    return (
     <div>
        <h1>Service detail with this id:{service.title}</h1>
     </div>
    )
}
const mappingProps = state => {
     return {
        service: state.selectedService.item
     }
}

export default connect(mappingProps)(ServiceDetail)
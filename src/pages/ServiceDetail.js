import { useParams } from "react-router-dom"

function ServiceDetail() {
    const {serviceId} = useParams()
    return (
     <div>
        <h1>Service detail with this id:{serviceId}</h1>
     </div>
    )

}

export default ServiceDetail
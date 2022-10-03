import { Link } from "react-router-dom"

export default function ServiceItem ({service}) {
    
    const shortText = (text, maxLenght = 50) => {
       if(!text) return ' '
       if(text.lenght <= maxLenght) {return text}
       return text.substr(0, maxLenght) + '...'
    }
    return (
        <div className="flex">
        <p>{service.title}</p>
        <p>{shortText(service.description)}</p>
        <Link to={`services/${service.id}`}>Learn more</Link>
     </div>
    )
}
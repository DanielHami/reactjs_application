import { Link } from "react-router-dom"

export default function ServiceItem ({service}) {
    
    const shortText = (text, maxLenght = 50) => {
       if(!text) return ' '
       if(text.lenght <= maxLenght) {return text}
       return text.substr(0, maxLenght) + '...'
    }
    return (
        <div className="flex flex-col">
          <h1 className="text-red-700">Your services</h1>
          <div>
            <p>{service.title}</p>
          </div>
          <div>
            <p>{shortText(service.description)}</p>
          </div>
        <Link to={`services/${service.id}`}>Learn more</Link>
     </div>
    )
}
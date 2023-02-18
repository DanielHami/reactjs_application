import * as api from 'api'
import { COLLABORATION_CREATED_FROM_OFFER, FETCH_USER_MESSAGES_SUCCESS} from 'types'

export const collaborate = ({collaboration, message}) => dispatch => 
    api.createCollaboration(collaboration)
       .then(collabId => {
        message.cta = `/collaborations/${collabId}`
        api.sendMessage(message)
        api.markOfferAsInCollab(collaboration.fromOffer)
        dispatch({type: COLLABORATION_CREATED_FROM_OFFER,
                  offerId: collaboration.fromOffer,
                  offersType: 'sent' })
        return collabId
       })


export const subscribeToMessages = userId => dispatch => 
    api.subscribeToMessages(userId, messages => dispatch({type: FETCH_USER_MESSAGES_SUCCESS, messages}))
    
export const markMessageAsRead = message  => api.markMessageAsRead(message)

export const fetchCollaborations = userId => api.fetchCollaborations(userId)
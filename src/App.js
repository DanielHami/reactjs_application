import initStore from "store";
import { Provider } from 'react-redux'
import ServiceApp from "ServiceApp";
import { onAuthStateChanged, storeAuthUser,resetAuthState, subscribeToMessages} from "actions";
import React from "react";


const store = initStore()

class App extends React.Component {

  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(resetAuthState())
      store.dispatch(storeAuthUser(authUser))
      
      if(authUser) {
        this.unsubscribeMessages = store.dispatch(subscribeToMessages(authUser.uid))
        
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth()
    this.unsubscribeMessages()
  }
  render() {
    return (
      <Provider store={store}>
        <ServiceApp />
      </Provider>
    );
  }
}

export default App;

import initStore from "store";
import { Provider } from 'react-redux'
import ServiceApp from "ServiceApp";
import { onAuthStateChanged,storeAuthUser } from "actions";
import React from "react";


const store = initStore()

class App extends React.Component {
  
  componentDidMount() {
   
   this.unsubscribeAuth =  onAuthStateChanged((authUser) => {
   store.dispatch(storeAuthUser(authUser))
   })
  }
  componentWillUnmount() {
    this.unsubscribeAuth()
  }
  render() {
  return (
    <Provider store={store}>
        <ServiceApp/>
    </Provider>
  );
  }
}

export default App;

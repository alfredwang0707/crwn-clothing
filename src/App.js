import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'

import './App.css';

//pages
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component.jsx'

import { auth , createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import  { selectCurrentUser  } from  './redux/user/user.selectors'
import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

class App extends React.Component {

  //setting a property
  unsubscribeFromAuth = null


  componentDidMount(){
    const { setCurrentUser, collectionsArray } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      // this.setState({ currentUser: user })
      // console.log(user)
       if(userAuth) {
        const userRef  = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
             setCurrentUser({
                 id:snapshot.id,
                 ...snapshot.data()  
             })
        })
      } else {
        setCurrentUser(userAuth)
        addCollectionAndDocuments('collections', collectionsArray.map(({title, items }) => ({title, items })))
      }    
    })
  } 
  //close subscription
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render (){
    return (
      <div >  
        <Header />
        <Switch>       
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}  />
          <Route 
            exact
            path='/signin' 
            render= {() =>  
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
        />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);

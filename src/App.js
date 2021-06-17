import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth , createUserProfileDocument} from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {

  //setting a property
  unsubscribeFromAuth = null


  componentDidMount(){
    const { setCurrentUser } = this.props
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
          <Route path='/signin' 
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);

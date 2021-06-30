import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap }from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap=> ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})


export const fetchCollectionsStartAsync = () => {
     return dispatch => {
       const collectionRef = firestore.collection('collections') 
       dispatch(fetchCollectionsStart())

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
          });   
     }
}

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.fetchCollectionsFailure,
    payload: errorMessage
})

//if redux-think middleware is enable, anytime a attempt to dispatch a function instead of object
// middleware will call that function with dispatch method itself as the first argument
import {takeLatest, call, put, all} from 'redux-saga/effects'

import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure

} from './shop.actions'

export function* fetchCollectionAsync(){
    yield console.log('i am fired')
    
    try {     
        const collectionRef = firestore.collection('collections') 
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call (convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch(error){
        yield put(fetchCollectionsFailure(error.message))
    } 

   
//            collectionRef
//             .get()
//             .then(snapshot => {
//                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
//                dispatch(fetchCollectionsSuccess(collectionsMap))
//              });   
        
//    
}

export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionAsync
        )
} 

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}
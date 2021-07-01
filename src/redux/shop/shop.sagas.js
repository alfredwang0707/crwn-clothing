import {takeEvery} from 'redux-saga/effects'

import ShopActionTypes from './shop.types'

export function* fetchCollectionAsync(){
    yield console.log('i am fired');
}

export function* fetchCollectionsStart(){
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionAsync)
}
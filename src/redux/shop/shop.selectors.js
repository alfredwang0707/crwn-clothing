import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'


const selectShop = state => state.shop

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5

}

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)
// by wrapping this function in memoize, if this function gets called with same param
// dont return since its same value

export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => 
            collections.find(
                collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    )
)
//find collection.id matching the url param of our colleciton id map
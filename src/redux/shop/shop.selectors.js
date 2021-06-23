import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)



export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

const COLLECTION_ID_MAP = {
  hats:1,
  sneakers:2,
  jackets:3,
  womens:4,
  mens:5 
}

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    collections => collections.find(
      collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  ) 
)
// export const selectCollection = memoize((collectionUrlParam)
// createSelector(
//   [selectCollections],
//   (collections) => collections[collectionUrlParam]
// ))


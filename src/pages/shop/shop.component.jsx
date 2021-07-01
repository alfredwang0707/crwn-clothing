import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector} from 'reselect'

import {  fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPage from '../collection/collection.component'

const CollectionPageWithSpinner = WithSpinner(CollectionPage)
 
class ShopPage extends React.Component {
  

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { fetchCollectionsStartAsync} = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={!selectIsCollectionsLoaded} {...props} />
          )}
        />
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector ({
  isCollectionLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage)
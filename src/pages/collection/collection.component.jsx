import React from 'react'
import { connect } from 'react-redux'
import { selectCollection, selectCollections} from '../../redux/shop/shop.selectors'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'


const CollectionPage =({ match }) => {
    return (    
    <div className='collection-page'>
        <h2> CollectionPage </h2>
    </div>
)} 

const mapStateToProps = (state, ownProps) => ({
    colleciton: selectCollection(ownProps.match.params.collecitonId)(state)
})

export default connect(mapStateToProps)(CollectionPage)
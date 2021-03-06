import React, { Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component'; 

// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import CollectionPageContainer from '../collection/collection.container';

// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));

const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  // unsubscribeFromSnapshot = null;            //nuovo metedo di cancellazione istantanea della matrice di collez

  // componentDidMount() {
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');  //invia istantanea dell array di oggetti
    
    //recupero dei dati delle collezioni usando il metodo fetch dell'API Rest
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/crown-db-a331a/databases/(default)/documents/collections'
    // )
    // .then(response => response.json())
    // .then(collections => console.log(collections));

    // collectionRef.get().then                 //chiamata API a Firestore per fetch dei dati
    //  (snapshot=> {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

  //   const { fetchCollectionsStart } = this.props;
  //   fetchCollectionsStart();
  // }

  // render() {
    // const { match } = this.props;
    // const { loading } = this.state;

    return(
      <div className='shop-page'>
        <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} 
          component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} 
          component={CollectionPageContainer} />
        </Suspense>  
      </div>
    );
  }


const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
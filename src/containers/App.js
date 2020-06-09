import React, { Suspense } from 'react';
import { LastLocationProvider } from 'react-router-last-location';
import DefaultRouter from './Router';
import Loader from '../components/Loader';
import Header from '../components/Header';

const App = () => {

  return (
    <LastLocationProvider>
      <Suspense fallback={<Loader />}>
        <Header />
        <DefaultRouter />
      </Suspense>
    </LastLocationProvider>
  );
}

export default App;

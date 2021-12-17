import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import reduxStore from '@store';
import Loader from './Components/Loader';
import NavContainer from './ScreenRouting';

// export const reduxPersistStore = persistStore(reduxStore);

export const Src = () => {

    const reduxPersistStore = persistStore(reduxStore);

    const renderLoader = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Loader LoadingMsg="Setting up please wait.." />
            </SafeAreaView>
        );
    };

    return (
        <Provider store={reduxStore}>
            <PersistGate loading={renderLoader()} persistor={reduxPersistStore}>
                <NavContainer />
            </PersistGate>
        </Provider>
    );
};

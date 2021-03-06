import { Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import GlobalLoading from './common/globalLoading';
import ModalAddContainer from "./containers/modalAddContainer";
import configStore from './redux/store';
import './firebaseConnect';


const { store, persistor } = configStore();

const LoginPage = lazy(() => import('./pages/loginPage'));
const CartPage = lazy(() => import('./pages/cartPage'));
const HomePage = lazy(() => import('./pages/homePage'));
const DetailPage = lazy(() => import('./pages/detailProductPage'));
const App = () => {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Suspense fallback={<Skeleton active />}>
                            <Switch>
                                <Route path="/" exact>
                                    <HomePage />
                                </Route>
                                <Route path="/product/:id">
                                    <DetailPage />
                                </Route>
                                <Route path="/login" exact>
                                    <LoginPage />
                                </Route>
                                <Route path="/cart" exact>
                                    <CartPage />
                                </Route>
                            </Switch>
                            <GlobalLoading />
                            <ModalAddContainer />
                        </Suspense>
                    </Router>
                </PersistGate>
            </Provider>
        </>
    );
};
export default App;

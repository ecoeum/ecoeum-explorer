import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import Store from '@/redux/Store';
import history from '@/router/History';

/*初始化*/
renderWithHotReload(App);

/*热更新*/
if(module.hot){
    module.hot.accept('./App',()=>{
        const AppNext = require('./App').default;
        renderWithHotReload(AppNext);
    });
}

function renderWithHotReload(RootElement){
    ReactDOM.render(
        <AppContainer>
            <Provider store={Store}>
                <Router history={history}>
                    <RootElement/>
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById("content")
    );
}

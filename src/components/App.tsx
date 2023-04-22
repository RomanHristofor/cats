import React from 'react';
import store from '../store'
import {Provider} from 'react-redux'
import MyRoutes from './Routes'
import Home from './common/Home'
import NotFound from './common/NotFound'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Wrap, Title} from './css'


function App() {

    return (
        <Wrap>
            <BrowserRouter>
                <Provider store={store}>
                    <div>
                        <Title primary>List of cats</Title>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cats//*" element={<MyRoutes />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Provider>
            </BrowserRouter>
        </Wrap>
    );
}

export default App;

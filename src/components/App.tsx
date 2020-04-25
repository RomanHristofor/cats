import React from 'react';
import store from '../store'
import {Provider} from 'react-redux'
import Routes from './Routes'
import Home from './common/Home'
import NotFound from './common/NotFound'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Wrap, Title} from './css'


function App() {
    return (
        <Wrap>
            <Router>
                <Provider store={store}>
                    <div>
                        <Title primary>List of cats</Title>
                        <Switch>
                            <Route path="/" component={Home} exact />
                            <Route path="/cats" component={Routes} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        </Wrap>
    );
}

export default App;

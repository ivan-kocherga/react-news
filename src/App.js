import './App.css';
import News from './components/News'
import Login from './components/Login'
import NewsDetail from './components/NewsDetail'
import Main from './components/Main'
import Header from './components/help-components/Header';
import Footer from './components/help-components/Footer';
import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Context from "./api/context";


function App() {

    let [arr ,setUpdate] = useState([0])

    const options = {
        // you can also just use 'bottom center'
        position: positions.BOTTOM_CENTER,
        timeout: 5000,
        offset: '30px',
        // you can also just use 'scale'
        transition: transitions.SCALE
    }

    function update(){
        let arrCopy = arr.concat([0])
        setUpdate(arrCopy)
        console.log('update...')
    }

    return (
        <Context.Provider value={{update}}>

            <AlertProvider template={AlertTemplate} {...options}>

                <div className='app'>

                    <Router>

                        <Header/>
                        <div className='main'>
                            <Switch>
                                <Route exact path="/">
                                    <Main />
                                </Route>
                                <Route path='/news/:id'>
                                    {Boolean(localStorage.getItem('token')) ? <NewsDetail/> : <Redirect to='../auth'/>}
                                </Route>
                                <Route path='/news'>
                                    <News />
                                </Route>
                                <Route path='/auth'>
                                    <Login/>
                                </Route>
                                <Route path='*'>
                                    <div>
                                        Страница не найдена. 404
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                        <Footer/>

                    </Router>

                </div>

            </AlertProvider>

        </Context.Provider>
    )
}

export default App;

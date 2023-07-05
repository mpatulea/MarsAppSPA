import React, {useState, useEffect, createContext, useContext} from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import NASAInformation from "./components/NASAInformation";
import ClickCounter1 from "./components/ClickCounter1";
import ClickCounter2 from "./components/ClickCounter2";
import SelectComponent from './components/SelectComponent';

interface ContextType {
    increase: () => void;
    count: number;
}

const context = createContext<ContextType | null>(null);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <NASAInformation/>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                    <SelectComponent/>
                    <Routes>
                        <Route path={'/version1'} element={<ClickCounter1 />}>

                        </Route>
                        <Route path={'/version2'} element={<ClickCounter2 />}>

                        </Route>
                        <Route path={'/version3'} element={<Component1 />}>

                        </Route>
                        <Route path={''} element={
                            <div>
                                <Link to={'/version1'}>Version 1</Link>
                                <br/>
                                <Link to={'/version2'}>Version 2</Link>
                                <br/>
                                <Link to={'/version3'}>Version 3</Link>
                            </div>
                        }>
                        </Route>
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

function Component1() {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const initialValue = localStorage.getItem("count");
        if (initialValue) {
            setCount(+initialValue);
        }
    }, []);

    const increase = (): void => {
        setCount(prevCount => {
            const newCount = Number(prevCount) + 1;
            localStorage.setItem("count", String(newCount));
            return newCount;
        });
    }

    const contextValue: ContextType = {increase, count};

    return (
        <div>
            <context.Provider value={contextValue}>
                <Component2 />
                <Component3 />
            </context.Provider>
        </div>
    )
}

function Component2() {
    const contextComponent2 = useContext(context);

    return (
        <div>
            <button onClick={contextComponent2?.increase}>
                Click Here
            </button>
        </div>
    )
}

function Component3() {
    return (
        <div>
            <Component4 />
            <p>This message comes from Component 3</p>
        </div>
    )
}

function Component4() {
    const contextComponent4 = useContext(context);

    return (
        <div>
            <p>You clicked {contextComponent4?.count} times</p>
        </div>
    )
}

export default App;

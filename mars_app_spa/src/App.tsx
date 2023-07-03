import React, {useState, useEffect, createContext, useContext} from 'react';
import logo from './logo.svg';
import './App.scss';
import nasa_image from './nasa_img.png';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';

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
                <img src={logo} className="App-logo" alt="logo" />
                <NASAInformation/>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <SelectComponent />
                <Routes>
                    <Route path={'/version1'} element={<ButtonClicks1 />}>

                    </Route>
                    <Route path={'/version2'} element={<ButtonClicks2 />}>

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

function TemplateComponent(props: { img: string, title: string, p1: string, p2: string; }) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>
                {props.p1}
            </p>
            <p>
                {props.p2}
            </p>

            <img src={props.img} alt={'image'} id={'img'}/>
        </div>

    )
}

function NASAInformation() {
  return (
      <div>
          <TemplateComponent title='Some NASA information' p1={'paragraph 1'} p2={'paragraph 2'} img={nasa_image}/>
      </div>
  )
}

function ButtonClicks1() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click Here!
            </button>
        </div>
    );
}

function ButtonClicks2() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const initialValue = localStorage.getItem("count");
        if (initialValue) {
            setCount(+initialValue);
        }
    }, []);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => {
                setCount(prevCount => {
                    const newCount = Number(prevCount) + 1;
                    localStorage.setItem("count", String(newCount));
                    return newCount;
                });
            }}>
                Click Here
            </button>
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

function SelectComponent() {
    const [rovers, setRovers] = useState<Array<any> | null>(null);

    useEffect(() => {
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=Zf0E0azedulQuZTTxs4FebI0VrmtRufv3WQ2ymCn')
            .then(res => {
                const rovers: Array<any> = res.data['rovers'];
                setRovers(rovers);
                console.log(rovers);
            })
    }, []);

    const options = rovers?.map((item, index) => (
        {value: index, label: item.name}
    ));

    return (
        <div>
            <Select options={options} />
        </div>
    );
}

export default App;

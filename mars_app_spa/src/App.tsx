import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import nasa_image from './nasa_img.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NASAInformation/>
          <Component1/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
    const [count, setCount] = useState(0);

    useEffect(() => {
        const initialValue = localStorage.getItem("count");
        if (initialValue) {
            setCount(+initialValue);
        }
    }, []);

    const increase = () => {
        setCount(prevCount => {
            const newCount = Number(prevCount) + 1;
            localStorage.setItem("count", String(newCount));
            return newCount;
        });
    }

    return (
        <div>
            <Component2 clickMethod={increase}/>
            <Component3 count={count}/>
        </div>
    )
}

function Component2(params: {clickMethod: React.MouseEventHandler<HTMLButtonElement>; }) {
    return (
        <div>
            <button onClick={params.clickMethod}>
                Click Here
            </button>
        </div>
    )
}

function Component3(params: { count: number; }) {
    return (
        <div>
            <Component4 count={params.count}/>
            <p>This message comes from Component 3</p>
        </div>
    )
}

function Component4(params: { count: number; }) {
    return (
        <div>
            <p>You clicked {params.count} times</p>
        </div>
    )
}

export default App;

import React, {useState, useEffect, createContext, useContext} from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import axios from 'axios';
import NASAInformation from "./components/NASAInformation";
import ClickCounter1 from "./components/ClickCounter1";
import ClickCounter2 from "./components/ClickCounter2";

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
                        <Route path={'/version3'} element={<Component1/>}>

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

function SelectComponent() {
    const [rovers, setRovers] = useState<Array<any> | null>(null);

    useEffect(() => {
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=Zf0E0azedulQuZTTxs4FebI0VrmtRufv3WQ2ymCn')
            .then(res => {
                const rovers: Array<any> = res.data['rovers'];
                setRovers(rovers);
            })
    }, []);

    const roverNames = rovers?.map((item, index) => (
        {value: index, label: item.name}
    ));

    const [selectedRover, setSelectedRover] = useState<string>(roverNames?.[0].label);

    const handleChangeRover = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedRover(event.target.value);
    };

    const [selectedCamera, setSelectedCamera] = useState<string>('select camera type');

    const [cameraTypes, setCameraTypes] = useState<{cameraName: string, cameraFullName: string}[]>([]);

    useEffect(() => {
        let localCameras: {cameraName: string, cameraFullName: string}[] = [];

        for (let i = 0; i < 4; i++) {
            if (i === +selectedRover) {
                const cameras = rovers?.[i].cameras;
                for (let j = 0; j < cameras.length; j++) {
                    const cameraName = cameras[j].name;
                    const cameraFullName = cameras[j].full_name;
                    localCameras.push({cameraName, cameraFullName});
                }
                setCameraTypes(localCameras);
                return;
            }
        }
    }, [selectedRover, rovers])

    const handleChangeCamera = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedCamera(event.target.value);
    };

    const [photos, setPhotos] = useState<Array<any>>([]);

    const displayPhotos = () => {

        let roverName = '';
        if (+selectedRover === 0) {
            roverName = 'curiosity';
        } else if (+selectedRover === 1) {
            roverName = 'spirit'
        } else if (+selectedRover === 2) {
            roverName = 'opportunity'
        } else if (+selectedRover === 3) {
            roverName = 'perseverance'
        }

        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?camera=${selectedCamera}&sol=1&api_key=Zf0E0azedulQuZTTxs4FebI0VrmtRufv3WQ2ymCn`)
            .then(res => {
                const photos = res.data['photos'];
                setPhotos(photos);
            })
    }

    const [photoPaths, setPhotoPaths] = useState<string[]>();

    useEffect(() => {
        let localPhotoPaths: string[] = [];
        for (let i = 0; i < photos.length; i++) {
            localPhotoPaths.push(photos[i].img_src);
        }
        setPhotoPaths(localPhotoPaths);
    }, [photos]);

    return (
        <div>
            <select value={selectedRover} onChange={handleChangeRover}>
                {roverNames?.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <br/>
            <select value={selectedCamera} onChange={handleChangeCamera}>
                {cameraTypes.map(option => (
                    <option key={option.cameraName} value={option.cameraName}>
                        {option.cameraFullName}
                    </option>
                ))}
            </select>
            <button onClick={displayPhotos} value={selectedCamera}>
                Submit
            </button>
            <p>{selectedRover}</p>
            <p>{selectedCamera}</p>
            {photoPaths?.slice(0, 5).map((path, index) => (
                <img key={index} src={path} alt={'rover-img'} />
            ))}
        </div>
    );
}

export default App;

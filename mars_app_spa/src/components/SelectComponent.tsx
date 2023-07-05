import React, {useEffect, useState} from "react";
import axios from "axios";

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

export default SelectComponent;
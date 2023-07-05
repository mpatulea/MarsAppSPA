import React, {useEffect, useState} from "react";

function ClickCounter2() {
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

export default ClickCounter2;
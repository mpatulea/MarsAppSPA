import React, {useState} from "react";

function ClickCounter1() {
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

export default ClickCounter1;
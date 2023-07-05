import React from "react";

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

export default TemplateComponent;
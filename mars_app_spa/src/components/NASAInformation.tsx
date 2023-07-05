import nasa_image from "../nasa_img.png";
import React from "react";
import TemplateComponent from "./TemplateComponent";

function NASAInformation() {
    return (
        <div>
            <TemplateComponent title='Some NASA information' p1={'paragraph 1'} p2={'paragraph 2'} img={nasa_image}/>
        </div>
    )
}

export default NASAInformation;
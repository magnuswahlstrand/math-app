import React from "react";
import CSS from 'csstype';
import squareImage from "./images/square_cropped.png"
import rectangleImage from "./images/rectangle_cropped.png"
import triangleImage from "./images/triangle_cropped.png"
import {Group} from "@mantine/core";


const inputStyle: CSS.Properties = {
    margin: '20px',
    fontSize: "1.5em",
    width: "100px",
    textAlign: "center",
}


export const ProblemImage: React.FC<{ name: string, numbers: number[] }> = ({name, numbers}) => {
    let src, top, left, right, bottom
    let offsetTop = 0

    switch (name) {
        case "rectangle": {
            top = numbers[0]
            left = numbers[1]

            src = rectangleImage
            break
        }
        case "square": {
            top = numbers[0]

            src = squareImage
            break
        }
        case "triangle": {
            top = numbers[0]
            bottom = numbers[1]
            left = numbers[2]
            offsetTop = 65

            src = triangleImage
            break
        }
        default: {
            return <></>
        }
    }

    return (
        <Group direction="column" position="center">
            <div style={{position: "relative", top: offsetTop}}>{top}</div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <div>{left}</div>
                <img src={src} alt="shape" style={{height: "150px"}}/>
                {right}
            </div>
            <div>{bottom}</div>
        </Group>
    )
}

export default ProblemImage;

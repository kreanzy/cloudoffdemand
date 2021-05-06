import React from "react";
import { Fade } from '@material-ui/core'

export default function FadeIn(props) {

    const {condition, ...prop} = props

    return (
        <Fade
            in={condition}
            unmountOnExit={true}
            exit={false}
            timeout={750}
        >
            <div>
                {prop.children}
            </div>
        </Fade>
    )
}
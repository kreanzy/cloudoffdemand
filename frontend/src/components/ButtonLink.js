import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core'

function ButtonLink(props) {

    const {path, ...prop} = props

    const history = useHistory();
    
    const handleOnClick = useCallback(() => {
        history.push(path)
        window.location.reload();
    }, [history]);

    return (
        <Button
            onClick={handleOnClick}
            {...prop}
        >
            {props.children}
        </Button>
    );
}

export default ButtonLink
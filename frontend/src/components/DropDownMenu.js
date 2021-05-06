import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #FFF',
        background: '#333333'
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        color: '#FFF',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#000',
         },
    },
}))(MenuItem);

export default function DropDownMenu(props) {

    const {title, children, ...prop} = props
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const childrenList = children.map((child) => {
        return (
            <StyledMenuItem>
                {child}
            </StyledMenuItem>
        )
    })

    return (
        <>
            <Button
                onClick={handleClick}
                {...prop}
            >
                {title}
            </Button>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {childrenList}
            </StyledMenu>
        </>
    );
}

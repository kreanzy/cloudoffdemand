import React, { useState, useEffect } from "react"
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Badge, Menu, MenuItem, Link } from '@material-ui/core'
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ButtonLink from './ButtonLink'
import DropDownMenu from './DropDownMenu'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
        color: '#FFFFFF'
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: '240px',
        flexShrink: 0,
    },
    appBar: {
        background: '#333333',
        zIndex: theme.zIndex.drawer + 1,
    },
    list: {
        width: 240,
    },
    grow: {
        flexGrow: 1,
    },
    navButton: {
        height: '32px', 
        marginRight: '8px',
    },
    logo: {
        marginRight: '24px',
    },
}));

const mobile = { md: 'block', desktop: 'none' }
const desktop = { sm: 'none', md: 'none', desktop: 'block' }
  
export default function Navbar() {

    const classes = useStyles();
    const username = localStorage.getItem('username')
    const inbox = 4
    const notify = 3
    const profile = 0
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [notifyText, setNotifyText] = useState([])
    const [notifyNumber, setNotifyNumber] = useState(0)
    const history = useHistory()

    useEffect(() => {
        axios.get("/notification", {
            params: {
                status: 'unread',
                username: localStorage.getItem("username")
            }
        }).then(response => {
                console.log(response.data.data)
                var notifyText = (response.data.data).map(noti => {
                    return {
                        notifyid: noti._id,
                        topic_id: noti.topic_id,
                        topic: (noti.topic).substring(0,20),
                        comment: (noti.comment).substring(0,20)
                    }
                })
                setNotifyText(notifyText)
                setNotifyNumber(notifyText.length)
            }).catch(err => {
                console.error(err)
            })
    }, []);

    const toggleDrawer = (state) => () => {
        setDrawerOpen(state)
    }

    const drawerItem = () => (
        <div
            className={classes.list}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['home', 'courses', 'qanda'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const handleLogout = () => {
        localStorage.setItem('username', '')
        localStorage.setItem('auth', false)
        history.push("/")
        window.location.reload()
    }

    const handleProfile = () => {
        history.push("/profile")
        window.location.reload();
    }

    const handleHome = () => {
        history.push("/home")
        window.location.reload();
    }

    const handleMycourse = () => {
        history.push("/mycourses")
        window.location.reload();
    }

    const handleCourse = () => {
        history.push("/search")
        window.location.reload();
    }

    const handleDashboard = () => {
        history.push("/qanda")
        window.location.reload();
    }

    const handleFollowingQuestion = () => {
        history.push("/qanda/follow")
        window.location.reload();
    }

    const handleNotify = (topicid, notifyid) => {
        history.push("/qanda/info?id=" + topicid)
        axios.post("http://localhost:4000/notification", {
                id: notifyid
            }).then(response => {
                console.log(response)
            }).catch(err => {
                console.error(err)
            })
        window.location.reload();
    }

    const notifyContent = () => {
        if (notifyText.length == 0) {
            return [<Box>You're all caught up!</Box>]
        }
        return (
            notifyText.map(content => (
                <div>
                    <Box onClick={() => handleNotify(content.topic_id, content.notifyid)}>
                        Topic : {content.topic}
                    </Box>
                    <Box onClick={() => handleNotify(content.topic_id, content.notifyid)}>
                       Detail : {content.comment}
                    </Box>
                </div>
            ))
        )
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Box display={mobile}>
                        <IconButton
                            className={classes.menuButton}
                            onClick={toggleDrawer(true)}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" color="secondary" className={classes.logo} >
                        OffDemand
                    </Typography>

                    <Box display={desktop}>
                        <Button
                            color="secondary"
                            className={classes.navButton}
                            onClick={handleHome}
                        >
                            Home
                        </Button>
                        <DropDownMenu
                            title='Course'
                            color="secondary"
                            className={classes.navButton}
                        >
                            <Box onClick={handleCourse}>Search Course</Box>
                            <Box onClick={handleMycourse}>My course</Box>
                        </DropDownMenu>
                        <DropDownMenu
                            title='Q&A'
                            color="secondary"
                            className={classes.navButton}
                        >
                            <Box onClick={handleDashboard}>Dashboard</Box>
                            <Box onClick={handleFollowingQuestion}>Folowing Question</Box>
                        </DropDownMenu>
                    </Box>

                    <div className={classes.grow} />

                    {/* <DropDownMenu
                        title={
                            <Badge
                                badgeContent={inbox}
                                color="primary"
                                children={<MailIcon color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        {inboxContent}
                    </DropDownMenu> */}

                    <DropDownMenu
                        title={
                            <Badge
                                badgeContent={notifyNumber}
                                color="primary"
                                children={<NotificationsIcon color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        {notifyContent()}
                    </DropDownMenu>

                    <DropDownMenu
                        title={
                            <Badge
                                badgeContent={profile}
                                color="primary"
                                children={<AccountCircle color="secondary"/>}
                                max={99}
                            />
                        }
                    >
                        <Box>Login as : {localStorage.getItem('username')}</Box>
                        <Box onClick={handleProfile}>Profile</Box>
                        <Box onClick={handleLogout}>Logout</Box>
                    </DropDownMenu>
                </Toolbar>
            </AppBar>

            {/* navbar for mobile */}
            <Drawer
                className={classes.drawer}
                onClose={toggleDrawer(false)}
                open={isDrawerOpen}
                anchor="left"
            >
                {drawerItem()}
            </Drawer>

            <Toolbar />
        </div>
    );
}
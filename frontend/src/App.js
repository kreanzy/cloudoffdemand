import React, { Component, createContext, useState, useContext, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { Container, Box } from '@material-ui/core'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import CreateCourse from './CreateCourse'
import CreateQuestion from './CreateQuestion'
import CourseVideo from './CourseVideo'
import EditCourse from './EditCourse'
import Home from './components/Home/Home'
import MyCourses from './MyCourses'
import MyCourseStudent from './MyCourseStudent'
import QuestionBoard from './components/QuestionBoard'
import QuestionCreate from './components/QuestionCreate'
import QuestionFollow from './components/QuestionFollow'
import QuestionInfo from './components/Question/QuestionInfo'
import SearchCourse from './components/Search/SearchCourse'
import CourseScreen from './components/Search/CourseScreen'
import Lesson from './components/Course/Lesson'
import Profile from './components/Profile/Profile'
import EditProfile from './components/Profile/EditProfile'
import ChangeEmail from './components/Profile/ChangeEmail'
import ChangePassword from './components/Profile/ChangePassword'
import CustomSnackbar from './components/CustomSnackbar'


function App() {

    const auth = localStorage.getItem('auth') == 'true' ? true : false

    // use this instead of Route
    // if not login (auth is false), PrivateRoute will redirect to Landing page
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            render={(props) => (
                auth ? <Component {...props} /> : <Redirect to='/' />
            )}
            {...rest}
        />
    )

    // if already login, redirect to home. if not, show login page
    const LoginRoute = ({ component: Component, ...rest }) => (
        <Route
            render={(props) => (
                auth ? <Redirect to='/home' /> : <Component {...props} />
            )}
            {...rest}
        />
    )

    return (
        <div>
            {auth && <Navbar />}
            <Container maxWidth="lg">
                <Box height='100vh'> 
                    <Router>
                        <Switch>
                            <PrivateRoute path='/create_course' component={CreateCourse} />
                            <PrivateRoute path='/create_question' component={CreateQuestion} />
                            <PrivateRoute path='/edit_course' component={EditCourse} />
                            <PrivateRoute path='/course_video' component={CourseVideo} />
                            <PrivateRoute path='/edit_profile' component={EditProfile}/>
                            <PrivateRoute path='/changeemail' component={ChangeEmail}/>
                            <PrivateRoute path='/changepassword' component={ChangePassword}/>
                            <PrivateRoute path='/home' component={Home}/>
                            
                            <PrivateRoute path='/profile' component={Profile}/>
                            


                            <PrivateRoute path='/qanda/follow' component={QuestionFollow}/>
                            <PrivateRoute path='/qanda/info' component={QuestionInfo}/>
                            <PrivateRoute path='/qanda' component={QuestionBoard}/>

                            <PrivateRoute path='/mycourses' component={localStorage.getItem('role')==='Tutor'? MyCourses : MyCourseStudent}/>
                            <PrivateRoute path='/search' component ={SearchCourse}/>
                            <PrivateRoute path='/course/:id' component ={CourseScreen}/>
                            <PrivateRoute path='/lesson/:id' component ={Lesson}/>
                            <LoginRoute path="/" component={Landing} />
                            
                        </Switch>
                    </Router>
                </Box>
            </Container>
        </div>
    );
}

export default App;
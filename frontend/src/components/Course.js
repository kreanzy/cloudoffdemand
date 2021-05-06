import React , { Component, useState } from "react";

export default class Course extends Component{
    
    render(){
        return(
            <div >
                <form>
                    <div className="form-group">
                        <label >Sign In</label>
                        <input type="text" class="form-control" placeholder="Username" name="username" required/> <br/>
                        <input type="password" class="form-control" placeholder="Password" name="password" required/> <br/>
                    </div>
                    <div class="text-center">
                        <input class="btn btn-dark col-6 mx-auto" type="submit" value="Sign In"/>
                        <a class="btn btn-dark col-6 mx-auto" type="button" value="Sign Up" href="/register" >Sign Up </a>
                    </div>
                    
                </form>
            </div>
        )
    }
}
import React from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
const Dashboard = React.lazy(()=> import('./dashboard'));
const Ticket = React.lazy(()=> import('./ticket'));
function nav(){

    return(
        <>
        
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/ticket">Booking</Link>
                
        </>
    )
}

export default nav;
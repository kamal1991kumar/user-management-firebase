import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Registration = lazy(() => import(/* webpackChunkName: 'registration' */ '../registration/Registration'));
const UserProfile = lazy(() => import(/* webpackChunkName: 'userProfile' */ '../userProfile/UserProfile'));


const Routers = () => {
    return(
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" exact element={<Registration />} />
                    <Route path="/userProfile" exact element={<UserProfile />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default Routers;
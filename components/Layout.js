import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';



Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({ children }) => {

    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />

            <link rel="stylesheet" href="/static/css/styles.css" />
        </React.Fragment>
        // two links treated as one statement because it all inside the Fragment
        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>

    );


    const [user, setAuthUser] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAuthUser(isAuth());
        }
    }, []);


    const nav = () => (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark">Home</a>
                </Link>
            </li>

            <li className="nav-item">
                <Link href="/user/link/create">
                    <a className="nav-link text-dark btn btn-success" style={{ borderRadius: '0px' }}>
                        Submit a link
                    </a>
                </Link>
            </li>

            {!user && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link text-dark">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/register">
                            <a className="nav-link text-dark">Register</a>
                        </Link>
                    </li>
                </React.Fragment>
            )}

            {user && user.role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-dark">{user.name}</a>
                    </Link>
                </li>
            )}



            {user && user.role === 'subscriber' && (
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-dark">{user.name}</a>
                    </Link>
                </li>
            )}

            {user && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link text-dark">
                        Logout
                    </a>
                </li>
            )}

        </ul>
    );

    return (
        <React.Fragment>
            {head()} {nav()} <div className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    );
};




export default Layout;
// ml-auto: margin on the left side ---> push to the right side  
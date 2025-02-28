import React from "react"
import {PublicClientApplication, LogLevel} from '@azure/msal-browser';
import { useMsal } from "@azure/msal-react";
import { loginRequest, graphConfig } from "../../../src/config";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

export const MsSignInButton = ({processMsLogin,className}) => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const already_logged_in = instance.getAllAccounts().length>0
    const handleLogin = () => {
        instance.loginPopup(loginRequest).then(response => {
            getUserData(response.accessToken).then(resp => {
                const userData = {
                    email_address: resp.mail,
                    first_name: resp.displayName.split(',')[1],
                    last_name: resp.displayName.split(',')[0],
                    password: 'tempPassword'
                }
                processMsLogin(userData);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    const getUserData = (accessToken) => {
        const headers = new Headers();
        const bearer = `Bearer ${accessToken}`;

        headers.append("Authorization", bearer);

        const options = {
            method: "GET",
            headers: headers
        };

        return fetch(graphConfig.graphMeEndpoint, options).then(res => res.json());
    }

    // const requestProfileData = () => {
    //     instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] }
    //       ).then((response) => {
    //         console.log('response:', response);
    //     });
    // }

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <>
            {/* <button className="account-button link" onClick={() => handleLogout(instance)}>Sign out using OpenID</button> */}
            {already_logged_in&&<div className="float-right"> <p className='warning'>You are not completly logged out. To Login again</p> <button className="" onClick={() => handleLogout(instance)}>Sign out</button></div>}
            {!already_logged_in&&<button className={className} onClick={() => handleLogin(instance)}>School Login</button>}
        </>
    );
}
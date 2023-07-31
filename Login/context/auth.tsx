import React, { useState } from 'react';
import { Auth } from "./common";
import { AUTH_QUERY } from './../graphQl/Auth/AuthenticationQuery';
import { useMutation } from "@apollo/client";

type AuthProps = {
  isAuthenticated: boolean;
  loading: boolean;
  loginError: boolean;
  authenticate: Function;
  checkToken: Function;
   signOut: Function;
};

const isValidToken = () => {
  let isAuth = false;
  const auth_data = Auth.get();
  if (auth_data) {
    const expiration = new Date(auth_data.expiration);
    isAuth = expiration >= new Date();
  }
  return isAuth;
}

export const AuthContext = React.createContext({} as AuthProps);

const AuthProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isValidToken());
  const [loginError, setLoginError] = useState(false);

  const [requestAuth, { loading, data }] = useMutation(AUTH_QUERY, {
    onCompleted: (d) => {     
      if(d.authorize.success){
        const authData = d.authorize.data;
        Auth.set(authData);
        setIsAuthenticated(true);
        setLoginError(false);
      }             
    }, onError: (e) => {
      setLoginError(true)
    }
  });

  function authenticate({ userName, password }: any) {
    requestAuth({
      variables: {
        "request":
        {
          "userName": userName,
          "password": password
        }
      },
    });
  }

  function checkToken() {
    setIsAuthenticated(isValidToken());
  }
  const signOut =()=>{
    Auth.remove();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        loginError,
        authenticate,
        checkToken,
        signOut,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

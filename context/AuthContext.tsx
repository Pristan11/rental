import React, {useContext, useState, useEffect, SetStateAction, Dispatch} from 'react';
import {FirebaseContext} from "./FirebaseContext";
import {Roles, ShoppingCardItem, User, User as LoginUser} from '../models/User'
import firebase from "firebase";
import {Address} from "../models";
// import User = firebase.User;
type AuthProps = {

    signout: Function;
    signIn: Function;
    signUp: Function;
    loginUser: LoginUser;
};

export const AuthContext = React.createContext({} as AuthProps);



const AuthProvider = (props: any) => {
    const {auth, usersRef, singleUserRef} = useContext(FirebaseContext);
    const [authenticatedUser, setAuthenticatedUser] = useState<LoginUser>(undefined);
    const [userRole, setUserRole] = useState('');
    const [loginUser, setLoginUser] = useState<LoginUser | null>(null);


    const  signIn  = async (email, password)=> {
        try {

            const res = await auth.signInWithEmailAndPassword(email, password)
              const loginUser1 = await   getLoginUser(res.user.uid);
            if(loginUser1){

            setLoginUser(loginUser1)
                return true
            }

        } catch (e) {
            console.debug('error', e);
        }
    }

    const  signout = async ()=>  {
    await  auth.signOut();
      setLoginUser(null);

    }

    const getLoginUser = async (id) => {

        const userSnapshot = await singleUserRef(id).get();
        if (userSnapshot.exists) {
            const lUser = userSnapshot.data()!;
            return lUser;
        }
    }


    const signUp = async (name , email, password, role )  => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email,password);
            console.log('signup res', res);
                if(res.user){
                    singleUserRef(res.user.uid).set(
                        {
                            email: email,
                            roles: role,
                            createdAt: new Date(),
                            displayName: name,
                            uid: res.user.uid
                        }
                    )
                }
            const loginUser1 = await   getLoginUser(res.user.uid);
                console.log('login user', loginUser1);
            if(loginUser1){

                setLoginUser(loginUser1)
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signout,
                signUp,
                loginUser

            }}
        >
            <>{props.children}</>
        </AuthContext.Provider>
    );
};

export default AuthProvider;

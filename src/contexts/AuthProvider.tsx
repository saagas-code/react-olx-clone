import axios from 'axios';
import { useEffect, useState } from 'react';
import { accounts } from '../types';
import { AuthContext } from './AuthContext';
import {nodeApi } from './../api';

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<accounts | null>(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token])



    const setToken = (token: string) => {
        localStorage.setItem('token', token)
    }

    const signin = async (token: string) => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            let json = await nodeApi.Request(token)
            setToken(token)
            return true
        } else {
            return false
        }
        
    } 

    const request = async (token: string) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const json = await nodeApi.Request(token)
        if(json) {
            setUser(json.user)
            return true
        }
        console.log('data', json)
        return false
    }

    const signout = async () => {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userLOGGED')
    }

    

    return (
        <AuthContext.Provider value={{user, signin, request, signout}}>
            {children}
        </AuthContext.Provider>
    )
}
import {createContext} from 'react';
import { accounts } from '../types';

export type AuthContextType = {
    user: accounts | null;
    request: (email: string) => Promise<boolean>;
    signin: (token: string) => Promise<any>;
    signout: () => void;
}


export const AuthContext = createContext<AuthContextType>(null!);
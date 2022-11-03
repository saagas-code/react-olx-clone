import css from './template.module.css'
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 



type Props = {
    children: React.ReactNode,
    path: string
}

export const ButtonItem = ({children, path}: Props) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();
    
    return (
        <>
            <Link to={path}>
                <button className={css.btn}>{children}</button>
            </Link>
        </>
    )
}


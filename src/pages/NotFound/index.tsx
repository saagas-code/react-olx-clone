import css from './template.module.css'
import { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';


export const NotFound = () => {

    const auth = useContext(AuthContext);

    return (
        <div className={css.homeContainer}>
            <>
                <h1>Página não encontrada</h1>
                <Link to="/">Voltar para a HOME</Link>
            </>
        </div>
    )
}
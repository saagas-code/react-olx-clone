import css from './template.module.css'
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const FooterItem = () => {

    
    return (
        <div className={css.footer}>
            © Copyright - SaagaS
        </div>
    )
}


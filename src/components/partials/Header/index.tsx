import css from './template.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import menuButton from '../../../assets/images/mobileButton.png'

export const HeaderItem = () => {
    const [menuOppened, setMenuOppened] = useState(false)

    const params = useParams();
    const auth = useContext(AuthContext);
    const logged = auth.user
    const navigate = useNavigate()

    useEffect(() => {
      let request = async () => {
      }
      request()
    }, [])
    
    const handleLogout =  () => {
        auth.signout()
    }
    

    
    return (
        <div className={css.HeaderArea}>
            <div className={css.container}
                style={{
                    //height:menuOppened?'200px':'50px'
                }}
            >
                <div className={css.logo}>
                    <Link to="/">
                        <span className={css.logo_1}>O</span>
                        <span className={css.logo_2}>L</span>
                        <span className={css.logo_3}>X</span>
                    </Link>
                    <button className={css.menuMobile} onClick={()=>setMenuOppened(!menuOppened)}>
                        <img src={menuButton} alt="" />
                    </button>
                </div>

                <nav className={css.navHeader} style={{
                    padding:menuOppened?'0px':'0px',
                    paddingBottom:menuOppened?'25px':'0px'
                }}>
                    <ul style={{
                        height:menuOppened?'107px':'1px',
                        right:menuOppened?'0px':'999px',
                    }}>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/minha-conta/dados">Minha Conta</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/add" className={css.button}>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Registrar</Link>
                                </li>
                            </>
                        }
                        
                    </ul>
                </nav>
                
            </div>
        </div>
    )
}


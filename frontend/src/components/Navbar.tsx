import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'

import SidebarMobile from './SidebarMobile'
import NavItem from './NavItem'

import useResponsive from '../hooks/useResponsive'

import '../styles/navbar.css'

const Navbar = () => {

    const role = localStorage.getItem('role')

    const isMobile = useResponsive()

    const [open, setOpen] = useState(false)

    const alumnoMenu = [
        {
            title: 'Inicio',
            path: '/dashboard-alumno'
        },
        {
            title: 'Registrar',
            path: '/dashboard-alumno/registro'
        },
        {
            title: 'Historial',
            path: '/dashboard-alumno/historial'
        },
        {
            title: 'Perfil',
            path: '/dashboard-alumno/perfil'
        }
    ]

    const vigilanteMenu = [
        {
            title: 'Dashboard',
            path: '/dashboard-vigilante'
        },
        {
            title: 'Reportes',
            path: '/dashboard-vigilante/reportes'
        },
        {
            title: 'Historial',
            path: '/dashboard-vigilante/historial'
        },
        {
            title: 'Perfil',
            path: '/dashboard-vigilante/perfil'
        }
    ]

    const menu =
        role === 'vigilante'
            ? vigilanteMenu
            : alumnoMenu

    const handleLogout = () => {

        localStorage.removeItem('role')
        localStorage.removeItem('user')

        window.location.href = '/login'
    }

    return (

        <>

            <nav className='navbar'>

                <Link
                    to={
                        role === 'vigilante'
                            ? '/dashboard-vigilante'
                            : '/dashboard-alumno'
                    }
                    className='logo'
                >
                    SIASE
                </Link>

                <div className='menu-container'>
                    {
                        !isMobile && (

                            <ul className='nav-links'>

                                {
                                    menu.map((item) => (

                                        <NavItem
                                            key={item.title}
                                            title={item.title}
                                            path={item.path}
                                        />

                                    ))
                                }

                                <button
                                    className='logout-btn'
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>

                            </ul>

                        )
                    }

                    {
                        isMobile && (

                            <button
                                className='menu-btn'
                                onClick={() => setOpen(!open)}
                            >

                                <FaBars />

                            </button>

                        )
                    }
                </div>

            </nav>

            {
                isMobile && (

                    <SidebarMobile
                        open={open}
                        items={menu}
                    />

                )
            }

        </>

    )
}

export default Navbar
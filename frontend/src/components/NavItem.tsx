import { Link } from 'react-router-dom'

interface Props {
    title: string
    path: string
}

const NavItem = ({ title, path }: Props) => {

    return (

        <li className='nav-item'>

            <Link to={path}>
                {title}
            </Link>

        </li>
    )
}

export default NavItem
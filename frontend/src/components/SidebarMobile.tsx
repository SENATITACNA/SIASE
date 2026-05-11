import NavItem from './NavItem'

interface Item {
    title: string
    path: string
}

interface Props {
    open: boolean
    items: Item[]
}

const SidebarMobile = ({ open, items }: Props) => {

    return (

        <div className={`sidebar ${open ? 'active' : ''}`}>

            <ul>

                {
                    items.map((item) => (

                        <NavItem
                            key={item.title}
                            title={item.title}
                            path={item.path}
                        />

                    ))
                }

            </ul>

            <button
    className='logout-btn'
    onClick={() => {

        localStorage.removeItem('role')
        localStorage.removeItem('user')

        window.location.href = '/login'
    }}
>
    Salir
</button>

        </div>
    )
}

export default SidebarMobile
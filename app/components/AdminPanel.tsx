import { NavLink } from '@remix-run/react'

export type Item = {
    to: string
    label: string
}

type AdminPanelProps = {
    items: Item[]
}

const AdminPanel = (props: AdminPanelProps) => {
    const baseClass =
        'p-4 transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'
    const activeClass = `${baseClass} font-bold`
    return (
        <div className='w-1/6 h-full bg-slate-300 flex flex-col divide-y divide-slate-100'>
            {props.items.map((item) => (
                <NavLink
                    to={item.to}
                    key={item.label}
                    className={({ isActive }) => (isActive ? activeClass : baseClass)}>
                    {item.label}
                </NavLink>
            ))}
        </div>
    )
}

export default AdminPanel

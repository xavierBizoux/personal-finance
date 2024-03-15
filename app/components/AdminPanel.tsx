import { NavLink } from '@remix-run/react'

export type Item = {
    to: string
    label: string
}

type AdminPanelProps = {
    items: Item[]
}

const AdminPanel = (props: AdminPanelProps) => {
    return (
        <div className='w-1/6 h-full bg-slate-300 flex flex-col divide-y divide-slate-100'>
            {props.items.map((item) => (
                <NavLink
                    to={item.to}
                    key={item.label}
                    className={({ isActive }) => (isActive ? 'font-bold p-4' : 'p-4')}
                >
                    {item.label}
                </NavLink>
            ))}
        </div>
    )
}

export default AdminPanel

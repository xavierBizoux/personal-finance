import { Form, NavLink } from '@remix-run/react'
import BudgetIcon from './icons/BudgetIcon'

type NavBarProps = {
    isAuthenticated: boolean
    isAdmin: boolean
}

const NavBar = ({ isAuthenticated, isAdmin }: NavBarProps) => {
    return (
        <nav className='flex items-center bg-gray-500 min-h-10'>
            <BudgetIcon className='h-10 fill-slate-300 m-4' />
            <div className='flex-1'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        isActive ? 'text-slate-300 m-4 p-2 font-bold' : 'text-slate-300 m-4 p-2'
                    }>
                    Dashboard
                </NavLink>
                {isAdmin && (
                    <NavLink
                        to='/admin'
                        className={({ isActive }) =>
                            isActive ? 'text-slate-300 m-4 p-2 font-bold' : 'text-slate-300 m-4 p-2 bg-transparent'
                        }>
                        Administration
                    </NavLink>
                )}
            </div>
            {isAuthenticated && (
                <Form
                    className='flex'
                    action='/auth/logout'
                    method='post'>
                    <button
                        type='submit'
                        className='text-slate-600 m-4 p-2 font-bold bg-slate-300 rounded-lg'>
                        Déconnexion
                    </button>
                </Form>
            )}
        </nav>
    )
}

export default NavBar

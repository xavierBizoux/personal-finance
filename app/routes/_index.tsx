import { LoaderFunction, redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { getUser } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
    return (await getUser(request)) ? redirect('/dashboard') : null
}

const Index = () => {
    return (
        <div className='h-full justify-center items-center flex flex-col gap-y-4'>
            <h1 className='text-6xl text-slate-500'>Gestion du budget Bizoux-Vialatoux</h1>
            <Link
                to='/auth/login'
                className='rounded-xl mt-2 w-1/6 text-center bg-slate-300 px-3 py-2 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
                S'identifier
            </Link>
        </div>
    )
}

export default Index

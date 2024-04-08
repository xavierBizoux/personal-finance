import { Link } from '@remix-run/react'
import DeleteIcon from '../icons/DeleteIcon'

type DeleteButtonProps = {
    to: string
}

const DeleteButton = ({ to }: DeleteButtonProps) => {
    return (
        <div className='text-center align-middle rounded-xl w-6 p-1 bg-slate-300 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
            <Link
                to={`${to}?action=delete`}
                key={to}>
                <DeleteIcon />
            </Link>
        </div>
    )
}

export default DeleteButton

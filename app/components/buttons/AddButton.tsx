import { Link } from '@remix-run/react'
import AddIcon from '../icons/AddIcon'

type AddButtonProps = {
    to: string
}

const AddButton = ({ to }: AddButtonProps) => {
    return (
        <button className='text-center align-middle rounded-xl w-6 p-1 ml-10 bg-slate-300 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
            <Link
                to={`${to}?action=create`}
                key={to}>
                <AddIcon />
            </Link>
        </button>
    )
}

export default AddButton

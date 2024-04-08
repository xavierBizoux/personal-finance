import { Link } from '@remix-run/react'
import EditIcon from '../icons/EditIcon'

type EditButtonProps = {
    to: string
}

const EditButton = ({ to }: EditButtonProps) => {
    return (
        <div className='text-center align-middle rounded-xl w-6 p-1 bg-slate-300 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
            <Link
                to={`${to}?action=edit`}
                key={to}>
                <EditIcon />
            </Link>
        </div>
    )
}

export default EditButton

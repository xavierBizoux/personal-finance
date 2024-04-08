import CopyIcon from "../icons/CopyIcon"

const CopyButton = () => {
    return (
        <button className='text-center align-middle rounded-xl w-6 p-1 bg-slate-300 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
            <CopyIcon />
        </button>
    )
}

export default CopyButton

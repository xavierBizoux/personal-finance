import { LoaderFunction } from '@remix-run/node'
import { useMatches } from '@remix-run/react'
import { Item } from '~/components/AdminPanel'

export const loader: LoaderFunction = async () => {
    return null
}

const AdminItem = () => {
    const matches = useMatches()
    const data = matches.at(-2)?.data
    const pathname = matches.at(-1)?.pathname
    let currentSection: Item = { to: '', label: '' }
    if (typeof data === 'object' && data && 'items' in data) {
        const items = data.items as Item[]
        currentSection = items.find((el) => el.to === pathname)!
    }
    return (
        <div className='flex flex-col w-5/6'>
            <h1 className='text-3xl m-4 ml-20'>{currentSection.label}</h1>
        </div>
    )
}

export default AdminItem

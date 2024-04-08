import CopyButton from './buttons/CopyButton'
import DeleteButton from './buttons/DeleteButton'
import EditButton from './buttons/EditButton'
import CheckIcon from './icons/CheckIcon'
import UncheckIcon from './icons/UncheckIcon'

export type Column = {
    id: string
    label: string
    type: string
}

export type Row = Array<string | number | boolean>

export type TableProps = {
    columns: Column[]
    rows: Row[]
    path: string
    editAllowed?: boolean
}

type CRUDCellsProps = {
    path: string
}

const CRUDCells = ({ path }: CRUDCellsProps) => {
    return (
        <>
            <td className='w-10'>
                <EditButton to={path} />
            </td>
            <td className='w-10'>
                <CopyButton />
            </td>
            <td className='w-10'>
                <DeleteButton to={path}/>
            </td>
        </>
    )
}

const Table = ({ columns, rows, path, editAllowed = true }: TableProps) => {
    return (
        <table className=' m-4 text-sm text-left'>
            <thead className='text-xs uppercase bg-gray-100'>
                <tr>
                    {columns.map((column) =>
                        column.id !== 'id' ? (
                            <th
                                key={column.id}
                                className='py-3 px-6'>
                                {column.label}
                            </th>
                        ) : null
                    )}
                    {editAllowed && (
                        <>
                            <th></th>
                            <th></th>
                            <th></th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => {
                    return (
                        <tr
                            key={String(row[0])}
                            className='border-b    '>
                            {row.map((cell, index) =>
                                columns[index].type !== 'id' ? (
                                    <td
                                        key={index}
                                        className='py-4 px-6'>
                                        {columns[index].type !== 'boolean' ? (
                                            cell
                                        ) : cell === true ? (
                                            <CheckIcon />
                                        ) : (
                                            <UncheckIcon />
                                        )}
                                    </td>
                                ) : null
                            )}
                            {editAllowed && <CRUDCells path={`${path}/${String(row[0])}`} />}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table

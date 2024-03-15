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
}

const Table = ({ columns, rows }: TableProps) => {
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
                                        ) : <UncheckIcon/>}
                                    </td>
                                ) : null
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table

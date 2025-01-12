import React from 'react';
import {Link} from "react-router-dom";
import {GET_STUDY_COMPRESS, ROOT_API} from "../../../../constants/apis";

interface TableProps {
    tableHead: TableHead[];
    rows: {}[];
    exportData?: (data:any) => void;
}

function Table (props:TableProps){

    const handleExport = (data:any) => {
        if (props.exportData) {
            props.exportData(data);
        }
    }
    return (
        <div className={``} >

            <div className="overflow-x-auto">

                <table className="min-w-full text-left text-white text-sm whitespace-nowrap">

                    <thead className="bg-zinc-600 uppercase tracking-wider border-b-2 border-zinc-800">
                        <tr>
                            {props.tableHead.map((head, index) => (
                                <th key={index} scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                                    {head.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {props.rows.map((data:any, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={` hover:bg-slate-600 ${
                                        index % 2 === 0 ? "" : "bg-zinc-700"
                                    }`}
                                >
                                    {
                                        props.tableHead.map((head, index) => (
                                            head.key !== "" ?
                                                <td className="px-6 py-1 border-x-2 border-zinc-800">{data[head.key]}</td>
                                                :
                                                <td className="px-6 py-1">
                                                    <button className="px-2 py-2 hover:text-cyan-400 hover:bg-zinc-700 rounded ">View</button>
                                                    <Link
                                                        to={`${ROOT_API}${GET_STUDY_COMPRESS}?patientId=${data['PatientID']}&&studyUID=${data['StudyInstanceUID']}`}
                                                        className="px-2 py-2 hover:text-cyan-400 hover:bg-zinc-700 rounded "
                                                    >Export</Link>
                                                    <button className="px-2 py-2 hover:text-cyan-400 hover:bg-zinc-700 rounded  ">Diagnose</button>
                                                </td>
                                        ))
                                    }
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Table;
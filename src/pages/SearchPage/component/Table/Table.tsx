import React from 'react';
import {Link} from "react-router-dom";
import {GET_STUDY_COMPRESS, ROOT_API} from "../../../../constants/apis";
import {convertPacDateTime} from "../../../../utils/time";

interface TableProps {
    tableHead: TableHead[];
    data: any;
    handleExport: (data:any) => void;
    handleRowClick: (data:any) => void;
}

function Table (props:TableProps){


    return (
            <div className="relative">

                <table className="min-w-full text-left text-white text-sm whitespace-nowrap">

                    <thead className="sticky top-0 bg-zinc-600 uppercase tracking-wider border-b-2 border-zinc-800">
                    <tr>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            ID
                        </th>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            Patient ID
                        </th>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            Name
                        </th>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            Description
                        </th>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            Date Time
                        </th>
                        <th scope="col" className={`px-6 py-4 border-x-2 border-zinc-800`}>
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        Array.isArray(props.data) && props.data.map((data: any, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className={` hover:bg-slate-600 ${index % 2 === 0 ? "" : "bg-zinc-700"}`}
                                    onDoubleClick={() => props.handleRowClick(data)}
                                >
                                    <td className="px-6 border-x-2 border-zinc-800">{index+1}</td>
                                    <td className="px-6 border-x-2 border-zinc-800">{data.PatientID}</td>
                                    <td className="px-6 border-x-2 border-zinc-800">{data.PatientName.original_string}</td>
                                    <td className="px-6 border-x-2 border-zinc-800">{data.StudyDescription}</td>
                                    <td className="px-6 border-x-2 border-zinc-800">{convertPacDateTime(data.StudyDate, data.StudyTime)}</td>
                                    <td className="px-6">
                                        <button
                                            className="px-2 py-3 hover:text-cyan-400 hover:bg-zinc-700 rounded "
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                props.handleExport(data);
                                            }}
                                        >
                                            Export
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>

                </table>

            </div>
    );
}

export default Table;
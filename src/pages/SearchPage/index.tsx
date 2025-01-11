import React, {useEffect, useMemo, useState} from "react";
import Table from "../../components/Table/Table";
import usePacs from '../../hooks/usePacs';
import {TableHeadOfStudy} from "../../constants/TableHeadOfStudy";
import {fetchStudy2Table} from "../../utils/flattenData";
import { MdUploadFile } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";



const SearchPage: React.FC = () => {
    const { data, fetchStudy, uploadFiles, isUploading, uploadError, uploadedFiles, uploadProgress } = usePacs();

    const [files, setFiles] = useState<File[]>([]);

    const [isFileClose, setIsFileClose] = useState<Boolean>(true);

    const flattenedData = useMemo(() => {
        return data ? fetchStudy2Table(data.data) : [];
    }, [data]);



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const dicomFiles = selectedFiles.filter(file =>
                file.name.toLowerCase().endsWith(".dcm") || file.name.toLowerCase().endsWith(".dicom")
            );
            if (dicomFiles.length === 0) {
                return;
            }
            setFiles(dicomFiles); // Lưu danh sách các tệp hợp lệ
            setIsFileClose(false);
            console.log("Tệp DICOM được chọn:", dicomFiles);
        }
    };

    const handleUpload = () => {
        console.log("Uploading files...")
        uploadFiles(files);
    }

    const handleUploadCancel = () =>{
        setFiles([])
        setIsFileClose(true)
    }


    return (

        <div className="bg-zinc-800 min-h-dvh pt-10">
            <div
                className={`flex justify-center items-center w-full absolute top-0 bottom-0 backdrop-blur-sm  ${isFileClose ? "hidden" : "block"}`}
                onClick={() => setIsFileClose(true)}
            >
                <div
                    className={`flex flex-col items-center relative w-2/6 bg-zinc-800 px-10 py-14 rounded  `}
                    onClick={(e)=>{e.stopPropagation()}}
                >
                    <button
                        className={`absolute right-0 top-0 text-white text-xl px-2 py-2 m-3 rounded bg-zinc-700`}
                        onClick={() => setIsFileClose(true)}
                    ><IoCloseSharp/></button>
                    {
                        files.length > 0 && (
                            <div className="flex flex-col w-full items-center bg-gray-700 p-4 rounded shadow">
                                <h2 className="text-white font-bold mb-2">List of files</h2>
                                <ul className="text-gray-300">
                                    {files.map((file, index) => (
                                        <li key={index} className="mb-1">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    <div>
                        <button
                            className={`bg-red-700 text-white px-4 py-2 mx-2 rounded mt-4`}
                            onClick={handleUploadCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={`bg-zinc-700 text-white px-4 py-2 mx-2 rounded mt-4`}
                            onClick={handleUpload}
                        >
                            Upload {uploadProgress}
                        </button>
                    </div>
                </div>
            </div>
            <div className="input-group">
                {/* Ẩn input file */}
                <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept="application/dicom, .dcm, .dicom"
                    multiple
                    onChange={handleFileChange}
                />
                {/* Giao diện tùy chỉnh */}
                <div className="flex justify-end mx-24 my-10">

                    {
                        files.length > 0 ?
                            <div>
                                <button
                                    className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
                                    onClick={() => setIsFileClose(false)}
                                >
                                    {files.length} Files selected
                                </button>
                            </div>
                            :
                            <label
                                htmlFor="file"
                                className={` cursor-pointer`}
                            >
                                <div className="p-3 border-2 rounded-full hover:bg-gray-200 transition duration-300">
                                    <MdUploadFile className="text-white text-3xl"/>
                                </div>
                            </label>
                    }
                </div>

            </div>
            <div className={`mx-24 rounded`}>
                <Table
                    tableHead={TableHeadOfStudy}
                    rows={flattenedData}
                />
            </div>

        </div>
    );
};

export default SearchPage;

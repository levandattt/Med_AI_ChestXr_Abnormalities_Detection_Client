import React, { useMemo, useState} from "react";
import Table from "./component/Table/Table";
import usePacs from '../../hooks/usePacs';
import {TableHeadOfStudy} from "../../constants/TableHeadOfStudy";
import {fetchStudy2Table} from "../../utils/flattenData";
import { MdUploadFile } from "react-icons/md";
import {IoCloseSharp, IoCloudUploadOutline} from "react-icons/io5";
import {toast} from "react-toastify";



const SearchPage: React.FC = () => {
    const { data, fetchStudy, uploadFiles, isUploading, uploadProgress } = usePacs();

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
        console.log("Uploading files...");

        setIsFileClose(true);

        toast.promise(
            uploadFiles(files, {
                onSuccess: () => {
                    setFiles([]);
                    setIsFileClose(true);
                    fetchStudy.refetch();
                },
                onError: () => {
                    throw new Error("Failed to upload files. Please try again.");
                },
            }),
            {
                pending: "Uploading files...",
                success: "Files uploaded successfully!",
                error: "Failed to upload files. Please try again.",
            },
            {
                position: "top-right",
                className: "bg-zinc-700 text-white",
                autoClose: 2000
            }
        );
    };


    const handleUploadCancel = () => {
        setFiles([])
        setIsFileClose(true)
    }

    return (

        <div className="bg-zinc-800 min-h-dvh pt-10">
            {/*<a href="weasis://%24dicom%3Aclose+--all+%24dicom%3Aget+-r+%22http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fv1%2Fstudies%2F2%7Chttp%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fv1%2Fstudies%2F1%22">nhaasn*/}
            {/*    voo ddaay2</a>*/}
            <div
                className={`flex justify-center items-center w-full absolute top-0 bottom-0 backdrop-blur-sm  ${isFileClose ? "hidden" : "block"}`}
                onClick={() => setIsFileClose(true)}
            >
                <div
                    className={`flex flex-col items-center relative w-2/6 bg-zinc-800 px-10 py-12 rounded  `}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <button
                        className={`absolute right-0 top-0 text-white text-xl px-2 py-2 m-3 rounded bg-zinc-700`}
                        onClick={() => setIsFileClose(true)}
                    ><IoCloseSharp/></button>
                    <h2 className="font-medium text-xl uppercase text-white mb-4">{files.length} Files selected</h2>

                    {

                        files.length > 0 && (
                            <div className="flex flex-col w-full items-center bg-gray-700 p-4 rounded shadow">
                                <ul className="text-gray-300">
                                    {files.map((file, index) => (
                                        <li key={index} className={`px-1 py-2 ${index!==0 && 'border-t border-zinc-500  border-dashed'}`}>
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    <div>
                        <button
                            className={`hover:bg-red-700 transition duration-300 bg-red-800 text-white px-4 py-2 mx-2 rounded mt-4`}
                            onClick={handleUploadCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={`hover:bg-gray-700 transition duration-300 bg-zinc-700 text-white px-4 py-2 mx-2 rounded mt-4`}
                            onClick={handleUpload}
                        >
                            Upload
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
                                    className="bg-zinc-700 text-white px-3 py-2 rounded hover:bg-gray-500 transition duration-300"
                                    onClick={() => setIsFileClose(false)}
                                >
                                    {
                                        isUploading ? (<>Uploading: {uploadProgress}%</>) : (
                                            <div className={`flex flex-nowrap justify-between items-center`}>
                                                <div className={`flex flex-nowrap items-center px-2`}>
                                                    <IoCloudUploadOutline className={`mx-2 text-xl`}/>
                                                    {files.length} Files selected
                                                </div>
                                                <button
                                                    onClick={(event)=> {
                                                        handleUploadCancel();
                                                        event.stopPropagation();
                                                    }}
                                                    className={`mx-2  p-2 rounded hover:bg-gray-700 transition duration-300`}
                                                >
                                                    <IoCloseSharp className={`text-xl`}/>
                                                </button>
                                            </div>
                                        )
                                    }
                                </button>
                            </div>
                            :
                            <label
                                htmlFor="file"
                                className={` cursor-pointer`}
                            >
                                <div className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">
                                    <MdUploadFile className="text-white text-2xl"/>
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

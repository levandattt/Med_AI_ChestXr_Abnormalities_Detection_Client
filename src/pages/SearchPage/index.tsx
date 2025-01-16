import React, {useEffect, useState} from "react";
import Table from "./component/Table/Table";
import usePacs from '../../hooks/usePacs';
import {TableHeadOfStudy} from "../../constants/TableHeadOfStudy";
import { MdUploadFile } from "react-icons/md";
import {IoCloseSharp, IoCloudUploadOutline} from "react-icons/io5";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useDownloadZip} from "../../hooks/useDownloadZip";
import _ from "lodash";



const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, fetchDicom, uploadFiles, isUploading, uploadProgress } = usePacs();
    const { isExportLoading, error, fetchZip } = useDownloadZip();

    const [files, setFiles] = useState<File[]>([]);
    const [isFileClose, setIsFileClose] = useState<Boolean>(true);

    const [searchValue, setSearchValue] = useState<string>("");
    const [searchMode, setSearchMode] = useState<string>("PatientID");
    const [tableData, setTableData] = useState<any[]|undefined>(data?.data);
    const [searchModeList, setSearchModeList] = useState<{ key: string; value: string; }[]>([
        {key: "PatientID", value: "Patient ID"},
        {key: "PatientName", value: "Patient Name"}
    ]);

    const [searchModeClose, setSearchModeClose] = useState<Boolean>(true);

    const handleSearch = (value: string) => {
        setSearchValue(value);
        if (searchValue === "") {
            setTableData(data?.data);
        }
        else
        if(searchMode==="PatientName"){
            const datas = _.filter(data?.data, (item) => {
                console.log("item: ", item);
                return item[searchMode]?.original_string?.toLowerCase().includes(searchValue.toLowerCase());
            });
            setTableData(datas);
        }
        else{
            const datas = _.filter(data?.data, (item) => {
                return item[searchMode].toLowerCase().includes(searchValue.toLowerCase());
            });
            setTableData(datas);
        }
    };

    useEffect(() => {
        handleSearch(searchValue);
    }, [searchValue, data]);

    const handleDownload = (data:any) => {
        if(isExportLoading){
            toast.info("Waiting for another exporting...")
        } else {
            const params = {
                patientID:data?.PatientID,
                studyInstanceUID:data?.StudyInstanceUID,
            };
            toast.promise(
                fetchZip(params),
                {
                    pending: "Exporting files...",
                    success: "Export completed. Click Save to download",
                    error: "Failed to Export files. Please try again.",
                },
                {
                    position: "top-right",
                    className: "bg-zinc-700 text-white",
                    autoClose: 2000
                }
            );
            console.log("Download data: ", data);

        }
    };

    const [isDialogClose, setIsDialogClose] = useState<Boolean>(true);

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
                    fetchDicom.refetch();
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



    const handleRowClick = (data:any) => {
        navigate('series', {state: data});
    }

    const handleSearchModeClick  = (content:string) => {
        setSearchModeClose(!searchModeClose)
        setSearchMode(content)
    }

    return (
        <div className="bg-zinc-800 h-dvh pt-10">
            <div className={`mx-24 text-3xl text-white`}>Study Level {isExportLoading}</div>

            {/*Upload*/}
            <div
                className={`flex justify-center items-center w-full absolute z-10 top-0 bottom-0 backdrop-blur-sm  ${isFileClose ? "hidden" : "block"}`}
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
                                        <li key={index}
                                            className={`px-1 py-2 ${index !== 0 && 'border-t border-zinc-500  border-dashed'}`}>
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


            <div className="flex justify-between items-center mx-24 my-10 ">
                <div className={`flex flex-nowrap`}>
                    <input
                        className="border rounded py-2 px-3 bg-transparent text-white placeholder-zinc-300 leading-tight focus:outline-8 outline-amber-50   focus:shadow-outline"
                        id="search"
                        placeholder="Seach"
                        type="text"
                        autoComplete="off"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} // Cập nhật giá trị ngay khi người dùng nhập

                    />
                    <div className={`relative rounded mx-3 flex bg-zinc-700`}>
                        {
                            searchModeList.map((item, index) => (
                                <button
                                    key={index}
                                    className={`
                                        px-3 rounded hover:bg-zinc-500 transition duration-300
                                        ${searchMode===item.key && !searchModeClose ? "bg-zinc-500 text-white z-10" : "text-white z-0"}
                                        ${searchModeClose && searchMode!==item.key ? "hidden" : "block"}
                                    `}
                                    onClick={(event) => handleSearchModeClick(item.key)}
                                >{item.value}</button>
                            ))
                        }
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

                    <div className="flex justify-end">
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
                                                        onClick={(event) => {
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
                                    <div
                                        className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">
                                        <MdUploadFile className="text-white text-2xl"/>
                                    </div>
                                </label>
                        }
                    </div>

                </div>
            </div>
            {/*Upload*/}

            {/*Table*/}
            <div
                className={`mx-24 rounded max-h-[60%] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400`}>
                <Table
                    tableHead={TableHeadOfStudy}
                    data={tableData}
                    handleRowClick={handleRowClick}
                    handleExport={handleDownload}
                />
            </div>

        </div>
    );
};

export default SearchPage;

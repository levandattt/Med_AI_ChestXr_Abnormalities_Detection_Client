import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {IoArrowBackOutline, IoCloseSharp, IoCloudUploadOutline} from "react-icons/io5";
import Table from "./component/Table/Table";
import {TableHeadOfStudy} from "../../constants/TableHeadOfStudy";
import usePacs from "../../hooks/usePacs";

const SeriesSearchPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data, fetchDicom, uploadFiles, isUploading, uploadProgress } = usePacs(
        location.state?.PatientID,
        "SERIES",
        location.state?.StudyInstanceUID
    );

    useEffect(() => {

        console.log(location.state);
        console.log("data:",data)
    },[]);

    const handleBack = () =>{
        navigate(-1);
    }

    const handleDiagnose = (data:any) => {
        navigate("/diagnostic", {state: data});
    }

    return (
        <div className="bg-zinc-800 h-dvh pt-10">
            <div className={`mx-24 text-3xl text-white`}>Series Level - {location.state.PatientName.original_string}</div>
            <div className="flex justify-between mx-24 my-10">
                <button
                    onClick={handleBack}
                    className="bg-zinc-700 text-white text-2xl px-4 py-2 rounded hover:bg-gray-500 transition duration-300 "
                >
                    <IoArrowBackOutline/>
                </button>
            </div>

            <div
                className={`mx-24 rounded  max-h-[60%] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-400`}
            >
                <Table
                    tableHead={TableHeadOfStudy}
                    data={data?.data}
                    onDiagnose={handleDiagnose}
                    handleRowClick={() => {}}
                />
            </div>

        </div>

    )
        ;
};

export default SeriesSearchPage;

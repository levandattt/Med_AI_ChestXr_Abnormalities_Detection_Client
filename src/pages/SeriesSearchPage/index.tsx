import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {IoArrowBackOutline, IoCloseSharp, IoCloudUploadOutline} from "react-icons/io5";
import Table from "./component/Table/Table";
import {TableHeadOfStudy} from "../../constants/TableHeadOfStudy";
import usePacs from "../../hooks/usePacs";
import TestViewDicom from "../TestViewDicom";

const SeriesSearchPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [viewDicom, setViewDicom] = useState(false);

    const { data, fetchDicom, uploadFiles, isUploading, uploadProgress } = usePacs(
        location.state?.PatientID,
        "SERIES",
        location.state?.StudyInstanceUID
    );

    const [patientID, setPatientID] = useState("");
    const [studyInstanceUID, setStudyInstanceUID] = useState("");
    const [seriesInstanceUID, setSeriesInstanceUID] = useState("");

    useEffect(() => {
        const handleEscPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setViewDicom(false);
            }
        };

        // Add event listener when component mounts
        window.addEventListener("keydown", handleEscPress);

        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener("keydown", handleEscPress);
        };
    }, []);

    useEffect(() => {

        console.log(location.state);
        console.log("data:",data)
    },[]);

    const handleBack = () =>{
        navigate(-1);
    }

    const handleDiagnose = (data:any) => {
        const state = {
            patientID: data.PatientID,
            studyInstanceUID: data.StudyInstanceUID,
            seriesInstanceUID: data.SeriesInstanceUID,
        };

        const query = new URLSearchParams(state).toString();
        window.location.href = `/diagnostic?${query}`;
    }


    // useEffect(() => {
    //         console.log("Hello");
    // }, [location.state]);

    const handleViewDicom = (data:any) => {
            setViewDicom(true);
            setPatientID(data.PatientID);
            setStudyInstanceUID(data.StudyInstanceUID);
            setSeriesInstanceUID(data.SeriesInstanceUID);
    }

    return (

        <div className="relative bg-zinc-800 h-dvh pt-10">
            <div className={`absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center ${viewDicom ? "bg-black bg-opacity-70" : "hidden"}`}
                onClick={() => setViewDicom(false)}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                >
                    <TestViewDicom PatientID={patientID} StudyInstanceUID={studyInstanceUID} SeriesInstanceUID={seriesInstanceUID}/>
                </div>
            </div>
            <div className={`mx-24 text-3xl text-white`}>Series Level
                - {location.state.PatientName.original_string}</div>
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
                    handleRowClick={() => {
                    }}
                    handleViewDicom={handleViewDicom}
                />
            </div>

        </div>

    )
        ;
};

export default SeriesSearchPage;

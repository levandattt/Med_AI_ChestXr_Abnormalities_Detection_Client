import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import {IoArrowBackOutline} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import useDiagnose from "../../hooks/useDiagnose";
import {ROOT_API} from "../../constants/apis";

const DiagnosticPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dots, setDots] = useState('');

    const handleBack = () =>{
        navigate(-1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();

    const {isLoading, diagnose, data} = useDiagnose(
        searchParams?.get("patientID")??'',
        searchParams?.get("studyInstanceUID")??'',
        searchParams?.get("seriesInstanceUID")??'',
    )

    useEffect(() => {
        console.log("data:",data)
    }, [data]);

    return (
        <div className="bg-zinc-800 h-dvh pt-10">
            <div className={`mx-24 text-3xl text-white`}>AI_Diagnose - Series UID: {searchParams.get("seriesInstanceUID")}</div>

            <div className="flex justify-between mx-24 my-10">
                <button
                    onClick={handleBack}
                    className="bg-zinc-700 text-white text-2xl px-4 py-2 rounded hover:bg-gray-500 transition duration-300 "
                >
                    <IoArrowBackOutline/>
                </button>
            </div>

            <div className={`flex justify-center`}>
                {
                    isLoading?
                        <div className={`text-white text-xl `}>Processing{dots}</div>:
                        <div className={`flex`}>
                            <div className={`relative flex flex-col items-center justify-center mx-5`}>
                                <div className={`h-[500px]`}>
                                    <img className={`h-full`} src={data?.data?.dicomOriginal?.image} alt="Original"/>
                                </div>
                                <h3 className={`flex absolute top-0 left-0 bg-zinc-900 p-1 text-white text-xl`}>Original
                                    Image</h3>
                                <a href={`weasis://` + encodeURIComponent(`$dicom:close --all $dicom:get -r "${ROOT_API}/api/v1/studies/series?patientId=${data?.data?.dicomOriginal?.metadata.PatientID}&studyInstanceUID=${data?.data?.dicomOriginal?.metadata.StudyInstanceUID}&seriesInstanceUID=${data?.data?.dicomOriginal?.metadata.SeriesInstanceUID}"`)}
                                   className={` bg-zinc-900 p-1 text-white text-xl`}>
                                    View in Weasis
                                </a>
                            </div>

                            <div className={`relative flex flex-col items-center justify-center mx-5`}>
                                <div className={`h-[500px]`}>
                                    <img className={`h-full`} src={data?.data?.dicomPredict?.image} alt="Result"/>
                                </div>
                                <h3 className={`flex absolute top-0 left-0 bg-zinc-900 p-1 text-white text-xl`}>Predict
                                    Image</h3>
                                <a href={`weasis://`+encodeURIComponent(`$dicom:close --all $dicom:get -r "${ROOT_API}/api/v1/studies/series?patientId=${data?.data?.dicomPredict?.metadata.PatientID}&studyInstanceUID=${data?.data?.dicomPredict?.metadata.StudyInstanceUID}&seriesInstanceUID=${data?.data?.dicomPredict?.metadata.SeriesInstanceUID}"`)} className={` bg-zinc-900 p-1 text-white text-xl`}>
                                    View in Weasis
                                </a>
                            </div>
                        </div>
                }
            </div>
        </div>
        );
    };

export default DiagnosticPage;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useFetchImage from "../hooks/useFetchImage";



interface TestViewDicomProps {
    PatientID: string;
    StudyInstanceUID: string;
    SeriesInstanceUID: string;
}

const TestViewDicom: React.FC<TestViewDicomProps> = (props) => {
    const {data,isLoading,fetchImage} = useFetchImage(props.PatientID, props.StudyInstanceUID, props.SeriesInstanceUID);

    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <div>
            {
                isLoading ? (
                    <div className={`text-3xl text-zinc-300 font-bold`}>Loading...</div>
                ) : (
                    <div>
                        <img src={data?.data?.image} alt="Original" style={{ width: "500px", margin: "10px" }} />
                    </div>
                )
            }
        </div>
    );
};

export default TestViewDicom;

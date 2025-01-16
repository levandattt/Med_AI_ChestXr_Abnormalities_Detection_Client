import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useFetchImage from "../hooks/useFetchImage";
import {ROOT_API} from "../constants/apis";



interface TestViewDicomProps {

}



const TestViewDicom: React.FC<TestViewDicomProps> = (props) => {

    const [data, setData] = useState<any>({
        patientID: "STUDY-9046",
        studyInstanceUID: "1.2.276.0.7230010.3.1.2.2831181056.2775482.1726619434.424651",
        seriesInstanceUID: "1.2.276.0.7230010.3.1.3.2831181056.2775482.1726619434.424652",
        seriesInstanceUID2: "1.2.826.0.1.3680043.8.498.12978677580798128190293054303399380603",
    });
    const rootlink3 = `$dicom:rs --url "http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs" -r "StudyInstanceUID=1.2.276.0.7230010.3.1.2.2831181056.2775482.1726619433.424645"`
    const rootlink = `http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/1.2.276.0.7230010.3.1.2.2831181056.2775482.1726619433.424645/series`
    const rootlink2 = `http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/1.2.276.0.7230010.3.1.2.2831181056.2775482.1726619433.424645/series/1.2.276.0.7230010.3.1.3.2831181056.2775482.1726619433.424646`
    const link =  `$dicom:rs --url "${rootlink}"`
    const link2 = `$dicom:get -w "http://localhost:6969/xml?patientId=${data.patientID}&studyUID=${data.studyInstanceUID}&seriesUID=${data.seriesInstanceUID}&seriesUID2=${data.seriesInstanceUID2}"`

    return (
        <div className={`flex flex-col justify-center items-center h-dvh`}>
            <div>{link2}</div>
            <a href={`weasis://${encodeURIComponent(rootlink3)}`}>View in weasis</a>
            <a href={`weasis://${encodeURIComponent(link2)}`}>View in weasis</a>
        </div>
    );
};

export default TestViewDicom;

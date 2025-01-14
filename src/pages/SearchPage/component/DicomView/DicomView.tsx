import React, {useState} from 'react';
import InsightViewer, {useImage} from "@lunit/insight-viewer";

interface DicomViewProps {
    wadouri: any;
}

function DicomView (props:DicomViewProps){

    const [zoom, setZoom] = useState(1); // Mức zoom
    const [pan, setPan] = useState({ x: 0, y: 0 }); // Vị trí pan
    const handleWheel = (event: React.WheelEvent) => {
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.max(prev + delta, 0.1));
    };


    const { image } = useImage({ wadouri: props.wadouri })
    return (
            <div>
                <InsightViewer image={image}/>
            </div>
    );
}

export default DicomView;
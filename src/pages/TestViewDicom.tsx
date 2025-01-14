import React, { useState } from 'react';
import axios from 'axios';

const TestViewDicom: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string>("");
    const [resultImage, setResultImage] = useState<string>("");
    const [metadata, setMetadata] = useState<{ original: string; result: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:6969/api/v1/diagnose", {
                params: {
                    patientID: "STUDY-9138",
                    studyInstanceUID: "1.2.276.0.7230010.3.1.2.2831181056.2775482.1726619435.424669",
                    seriesInstanceUID: "1.2.276.0.7230010.3.1.3.2831181056.2775482.1726619435.424670"
                },
            });

            const data = response.data;
            if (data.status === "success") {
                setOriginalImage(data.data.image.original);
                setResultImage(data.data.image.result);
                setMetadata(data.data.metadata);
            } else {
                setError("Failed to fetch images.");
            }
        } catch (err) {
            setError("An error occurred while fetching images.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchImages} disabled={loading}>
                {loading ? "Fetching Images..." : "Fetch Images"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {originalImage && resultImage && (
                <div>
                    <h3>Original Image</h3>
                    <img src={originalImage} alt="Original" style={{ width: "300px", margin: "10px" }} />

                    <h3>Result Image</h3>
                    <img src={resultImage} alt="Result" style={{ width: "300px", margin: "10px" }} />

                    <h4>Metadata:</h4>
                    <p>Original UID: {metadata?.original}</p>
                    <p>Result UID: {metadata?.result}</p>
                </div>
            )}
        </div>
    );
};

export default TestViewDicom;

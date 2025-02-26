import { useState, type ChangeEvent } from "react";
import { FaCamera } from "react-icons/fa";

interface CameraCaptureProps {
    onImageCapture?: (imageUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({onImageCapture}) => {
    const [ imageUrl, setImageUrl ] = useState<string | null>(null);

    const handleCapture = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            onImageCapture?.(url);
        }
    }

    return (
        <div className="grid w-full h-60 place-items-center">
            <div className="grid rounded-full border-blue-400 hover:bg-blue-400 border-4 w-40 h-40 place-items-center">
                <label className="grid w-full h-full place-items-center cursor-pointer">
                    <FaCamera className="w-1/2 h-1/2"/>
                    <input 
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCapture}
                        className="hidden"    
                    />
                </label>
            </div>

            {imageUrl && (
                <div>
                    <img
                        src={imageUrl}
                        alt="撮影した写真"                    ></img>
                </div>
            )}
        </div>
    )
}

export default CameraCapture;
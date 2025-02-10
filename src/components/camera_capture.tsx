import { useState, type ChangeEvent } from "react";

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
        <div>
            <div>
                        <label className="border border-black rounded w-full bg-cyan-400">
                    <span>📷</span>
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
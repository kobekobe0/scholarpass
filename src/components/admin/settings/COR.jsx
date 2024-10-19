import {useState, useEffect} from 'react'

function COR({id, trigger}) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        //should be pdf
        if (selectedFile && selectedFile.type === 'application/pdf') {
            console.log(selectedFile)
            setFile(selectedFile);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };
    return (
        <div 
        className={`w-full py-8 px-8 border-dashed border-2 ${dragActive ? 'border-emerald-800' : 'border-gray-400'} rounded-md flex flex-col items-center justify-center`}
        >
        <input 
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
            <p className="text-lg text-gray-600">
                {file ? `File: ${file.name}` : 'Drag & Drop COR file here or click to upload'}
            </p>
        </label>
        </div>
    )
}

export default COR
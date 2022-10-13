import { ChangeEvent, FC } from "react";

// interface FileUploadProps {

// }

const FileUpload: FC = () => {
    function photoChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
        }
    }
    return (
        <input
            className="input input-sm input-bordered w-full max-w-xs m-2"
            type="file"
            onChange={photoChangeHandler}
        />
    );
};

export default FileUpload;

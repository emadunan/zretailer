import { FC } from "react";

const EndToast: FC = () => {
    return (
        <div className="toast toast-end animate-bounce opacity-0">
            <div className="alert alert-success">
                <div>
                    <span>Product deleted successfully.</span>
                </div>
            </div>
        </div>
    );
}

export default EndToast;
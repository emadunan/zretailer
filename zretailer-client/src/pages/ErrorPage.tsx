import { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: FC = () => {
    const error = useRouteError() as Error;
    return (
        <>
            <h1>An Error Occured!</h1>
            <p>{error.message}</p>
        </>
    );
}

export default ErrorPage;

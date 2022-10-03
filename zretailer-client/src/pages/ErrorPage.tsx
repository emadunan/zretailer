import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError() as Error;
    return (
        <>
            <h1>An Error Occured!</h1>
            <p>{error.message}</p>
        </>
    );
}

export default ErrorPage;

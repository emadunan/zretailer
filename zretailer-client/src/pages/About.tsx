import { FC } from "react";
import { Link } from "react-router-dom";

const About: FC = () => {
    return (
        <>
            <main>
                <h2>Who are we?</h2>
                <p>
                    That feels like an existential question, do not you think?
                </p>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
};

export default About;

import { Link } from 'react-router-dom';

import './page404.scss';

const Page404 = () => {
    return (
        <div className="page404">
            <h1 className="page404__code">404</h1>

            <h2 className="page404__title">
                Oops! This page has vanished...
            </h2>

            <p className="page404__text">
                It seems that even Doctor Strange couldn't find this page.
            </p>

            <Link to="/" className="button button__main">
                <div className="inner">Back to Home</div>
            </Link>
        </div>
    );
};

export default Page404; 
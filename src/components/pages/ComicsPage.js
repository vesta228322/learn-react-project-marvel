import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";


function ComicsPage({ children }) {
    return (
        <>
            {children}
            <ComicsList />
        </>
    )
}

export default ComicsPage;
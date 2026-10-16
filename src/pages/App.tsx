import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodayPage from './today-page';
import ArchivePage from './archive-page';

export default function App () {
    return (
        <BrowserRouter>
            <div className='text-gray-700 flex h-screen'>

            {/*サイドメニュー部分*/}
            <div className="p-4 border">
                <Link to={"/today-page"} className="mb-4">今日のタスク</Link><p></p>
                <Link to={"/archive-page"}  className="mb-4">アーカイブページ</Link>
                <h1 className="mb-4">サイドメニュー</h1>
            </div>
            
            <Routes>
                <Route path="/today-page" element={<TodayPage />} />
                <Route path="/archive-page" element={<ArchivePage />} />

            </Routes>

            </div>
        </BrowserRouter>
    )

}
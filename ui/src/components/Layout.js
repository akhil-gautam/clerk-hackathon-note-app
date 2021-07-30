import Header from './Header';
import LeftNav from './LeftNav';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='main-layout-wrapper'>
        <LeftNav />
        <div className='content-area'>{children}</div>
      </main>
    </>
  );
};

export default Layout;

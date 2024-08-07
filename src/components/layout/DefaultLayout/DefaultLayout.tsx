import Brand from './components/Brand';
import Footer from './components/Footer';
import Header from './components/Header';
import Information from './components/Information';
import Newsletter from './components/Newsletter';
import UpButton from './components/UpButton';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <Information />
      {props.children}
      <Brand />
      <Newsletter />
      <Footer />
      <UpButton />
    </>
  );
}

export default DefaultLayout;

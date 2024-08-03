import Footer from "./components/Footer";
import Header from "./components/Header";
import UpButton from "./components/UpButton";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {/* <Header keyword={keyword} setKeyword={setKeyword} />
      <Information /> */}
      {props.children}
      {/* <Brand />
      <Newsletter />
      <Footer /> */}
      <Footer />
      <UpButton />
    </>
  );
}

export default DefaultLayout;

import DealProduct from '../Product/DealProduct/DealProduct';
import HottestProduct from '../Product/HottestProduct/HottestProduct';
import NewestProduct from '../Product/NewestProduct/NewestProduct';
import Carousel from './components/Carousel';
import Category from './components/Category';
import SlideShow from './components/SlideShow';

function Home() {
  return (
    <>
      <Carousel />
      <Category />
      <DealProduct />
      <HottestProduct />
      <NewestProduct />
      <SlideShow />
    </>
  );
}

export default Home;

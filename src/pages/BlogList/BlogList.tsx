import MainContent from './components/MainContent';
import Latest from './components/Latest';

const BlogList = () => {
  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <MainContent />
      <Latest />
    </div>
  );
};

export default BlogList;

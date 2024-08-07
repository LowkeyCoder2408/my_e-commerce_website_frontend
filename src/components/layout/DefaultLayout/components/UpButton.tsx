import { useState, useEffect } from 'react';
import styles from './scss/UpButton.module.scss';
import { FaChevronUp } from 'react-icons/fa';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UpButton() {
  const [isShowButton, setIsShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsShowButton(true);
    } else {
      setIsShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isShowButton && (
        <button onClick={handleClick} className={cx('up-btn')}>
          <FaChevronUp />
        </button>
      )}
    </>
  );
}

export default UpButton;

import { useState, useEffect, useRef } from 'react';
import styles from './scss/DropdownOnly.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface DropdownOnlyProps {
  selected: string;
  setSelected: (selected: string) => void;
  handleSelectChange: (value: number) => void;
  options: string[];
  style: React.CSSProperties;
}

function DropdownOnly(props: DropdownOnlyProps) {
  const [isDisplayActive, setIsDisplayActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDisplayActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cx('display-dropdown')}
      style={props.style}
      ref={dropdownRef}
    >
      <div
        onClick={(e) => {
          setIsDisplayActive(!isDisplayActive);
        }}
        className={cx('display-dropdown__btn')}
      >
        {props.selected}
        <FontAwesomeIcon icon={faCaretDown as IconProp} />
        {isDisplayActive && (
          <div className={cx('display-dropdown__content')}>
            {props.options.map((option, index) => (
              <div
                onClick={(e) => {
                  props.handleSelectChange(index + 1);
                  props.setSelected(option);
                  setIsDisplayActive(false);
                }}
                className={cx('display-dropdown__item')}
                key={index}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownOnly;

import { useEffect, useState } from 'react';
import styles from '../scss/SliderPriceFilter.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface SliderPriceFilterProps {
  min: number;
  max: number;
  step: number;
  forid: string;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

function SliderPriceFilter(props: SliderPriceFilterProps) {
  const [inputFrom, setInputFrom] = useState<number>(props.min);
  const [inputTo, setInputTo] = useState<number>(props.max);

  useEffect(() => {
    const minValue = Math.min(inputFrom, inputTo);
    const maxValue = Math.max(inputFrom, inputTo);

    if (props.minPrice !== minValue || props.maxPrice !== maxValue) {
      props.setMinPrice(minValue);
      props.setMaxPrice(maxValue);
    }

    const display = document.getElementById(props.forid);
    const slider = document.getElementById(`slider-${props.forid}`);

    if (display) {
      display.innerHTML = `(${minValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫ - ${maxValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫)`;

      if (slider) {
        slider.style.right = `${
          100 - ((maxValue - props.min) / (props.max - props.min)) * 100
        }%`;
        slider.style.left = `${
          ((minValue - props.min) / (props.max - props.min)) * 100
        }%`;
      }
    }
  }, [
    inputFrom,
    inputTo,
    props.minPrice,
    props.maxPrice,
    props.forid,
    props.min,
    props.max,
  ]);

  return (
    <div>
      <div className="my-3" id="display1"></div>
      <div className={cx('range-slider')}>
        <span
          className={cx('range-selected')}
          id={`slider-${props.forid}`}
        ></span>
      </div>
      <div className={cx('range-scroll')}>
        <input
          onChange={(e) => setInputFrom(parseInt(e.target.value))}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.min}
        />
        <input
          onChange={(e) => setInputTo(parseInt(e.target.value))}
          type="range"
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.max}
        />
      </div>
    </div>
  );
}

export default SliderPriceFilter;

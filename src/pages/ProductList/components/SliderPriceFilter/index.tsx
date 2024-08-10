import { useEffect, useState } from 'react';
import './SliderPriceFilter.css';

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

    props.setMinPrice(minValue);
    props.setMaxPrice(maxValue);
  }, [inputFrom, inputTo, props]);

  useEffect(() => {
    const display = document.getElementById(props.forid);
    const slider = document.getElementById(`slider-${props.forid}`);

    if (display) {
      if (inputFrom > inputTo) {
        display.innerHTML = `(${inputTo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫ - ${inputFrom
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫)`;
        if (slider) {
          slider.style.right = `${
            100 - ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
        }
      } else {
        display.innerHTML = `(${inputFrom
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫ - ${inputTo
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}₫)`;
        if (slider) {
          slider.style.right = `${
            100 - ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
        }
      }
    }
  }, [inputFrom, inputTo, props]);

  useEffect(() => {
    props.setMinPrice(inputFrom);
    props.setMaxPrice(inputTo);
  }, [inputFrom, inputTo]);

  return (
    <div>
      <div className="my-3" id="display1"></div>
      <div className="range-slider">
        <span className="range-selected" id={`slider-${props.forid}`}></span>
      </div>
      <div className="range-scroll">
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

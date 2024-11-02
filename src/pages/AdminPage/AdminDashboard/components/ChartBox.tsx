import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import './ChartBox.css';

type ChartBoxProps = {
  color: string;
  title: string;
  icon: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
  link: string;
};

const ChartBox = (props: ChartBoxProps) => {
  return (
    <div className="chartBox">
      <div className="chartBox__boxInfo">
        <div className="chartBox__boxInfo-title">
          <span>{props.title}</span>
          {/* <img src={props.icon} alt="" /> */}
        </div>
        <h1 className="chartBox__boxInfo-number">{props.number}</h1>
        <Link to={`${props.link}`} style={{ color: props.color }}>
          Xem tất cả
        </Link>
      </div>
      <div className="chartBox__chartInfo">
        <div className="chartBox__chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  background: 'transparent',
                  border: 'none',
                }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chartBox__texts">
          <span
            className="chartBox__texts-percentage"
            style={{
              color: props.percentage < 0 ? 'tomato' : 'limegreen',
            }}
          >
            {props.percentage}%
          </span>
          <span className="chartBox__texts-duration">tháng này</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;

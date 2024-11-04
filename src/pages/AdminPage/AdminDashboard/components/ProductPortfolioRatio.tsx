import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from '../scss/ProductPortfolioRatio.module.scss';
import { useEffect, useState } from 'react';
import ChartBox from '../components/ChartBox';
import CategoryModel from '../../../../models/CategoryModel';
import { getAllCategories } from '../../../../api/CategoryAPI';
import {
  findProductsByCategoryId,
  getTotalProductQuantity,
} from '../../../../api/ProductAPI';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProductPortfolioRatio = () => {
  const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);
  const [productQuantities, setProductQuantities] = useState<number[]>([]);
  const [data, setData] = useState<
    { name: string | undefined; value: number; color: string }[]
  >([]);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategoriesList(categories.categories);
        const quantities = await Promise.all(
          categories.categories.map((category) =>
            quantityOfCategory(category.id),
          ),
        );
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoriesList.length && productQuantities.length) {
      const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const updatedData = categoriesList.map((category, index) => ({
        name: category.name || '',
        value: productQuantities[index],
        color: generateRandomColor(),
      }));

      setData(updatedData);

      const updatedChartData = categoriesList.map((category, index) => ({
        name: category.name || `Danh mục ${category.id}`,
        value: productQuantities[index],
      }));

      setChartData(updatedChartData);
    }
  }, [categoriesList, productQuantities]);

  const quantityOfCategory = async (categoryId: number): Promise<number> => {
    try {
      const products = await findProductsByCategoryId(categoryId);
      const totalProducts = getTotalProductQuantity(products.result);
      return totalProducts;
    } catch (error) {
      console.error('Error calculating total products by category:', error);
      return 0;
    }
  };

  const chartBoxCategory = {
    color: '#8884d8',
    icon: '/user.svg',
    title: 'DANH MỤC SẢN PHẨM',
    link: '/admin/view-categories',
    number: categoriesList.length,
    chartData: chartData,
  };

  return (
    <div className={cx('pieChartBox')}>
      <div className={cx('pieChartBox__chart')}>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: 'white',
                borderRadius: '5px',
              }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ChartBox {...chartBoxCategory} />
    </div>
  );
};

export default ProductPortfolioRatio;

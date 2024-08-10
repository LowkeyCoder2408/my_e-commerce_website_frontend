import React, { useEffect, useState } from 'react';
import './CategoryFilter.css';
import CategoryModel from '../../../../models/CategoryModel';
import { getAllCategories } from '../../../../api/CategoryAPI';
import { Link } from 'react-router-dom';

interface CategoryFilterProps {
  categoryAlias?: string;
}

function CategoryFilter(props: CategoryFilterProps) {
  const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);
  const [selectedCategoryAlias, setSelectedCategoryAlias] = useState<string>(
    props.categoryAlias ?? '',
  );
  const handleCategoryClick = (categoryAlias: string) => {
    setSelectedCategoryAlias(categoryAlias);
  };

  useEffect(() => {
    getAllCategories().then((result) => {
      setCategoriesList(result.categories);
    });
  }, []);

  useEffect(() => {
    setSelectedCategoryAlias(props.categoryAlias ?? '');
  }, [props.categoryAlias]);

  return (
    <div className="category-filter__wrapper row m-0 p-0 mt-4">
      {categoriesList.map((category, index) => (
        <div
          className="col-xxl-3 col-xl-4 col-lg-3 col-md-2 col-sm-3 col-3 category-filter__item p-0"
          key={index}
        >
          <Link
            to={
              selectedCategoryAlias === category.alias &&
              selectedCategoryAlias != null
                ? `/product-list`
                : `/product-list/${category.alias}`
            }
            onClick={() => handleCategoryClick(category.alias)}
            className={`d-flex justify-content-center align-items-center flex-column ${
              selectedCategoryAlias === category.alias &&
              selectedCategoryAlias !== null
                ? 'active'
                : ''
            }`}
          >
            <div className="category-filter__img-wrapper">
              <img className="category-filter__img" src={category.image} />
            </div>
            <div className="category-filter__name mt-2">{category.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;

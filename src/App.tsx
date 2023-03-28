import React, { ChangeEvent, useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const cars = carsFromServer.map((car) => {
  const getColorById = colorsFromServer
    .find(color => (color.id === car.colorId));

  return {
    ...car,
    getColorById,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectId, setSelectId] = (0);

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  function handleFilter(str: string, query1: string) {
    return str.toLocaleLowerCase().includes(query1.toLocaleLowerCase());
  }

  const visibleCars = cars.filter(({ brand }) => (handleFilter(brand, query)));

  const handleChangeColorId = (event: ChangeEvent<HTMLOptionElement>) => {
    setSelectId(event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={handleChangeQuery}
      />

      <select>
        {colorsFromServer.map((color) => (
          <option onChange={handleChangeColorId}>{color.name}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>asd</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {visibleCars.map((car) => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: 'red' }}>{car.getColorById?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

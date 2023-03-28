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
  const [selectedColorId, setSelectedColorId] = useState(0);

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const visibleCars = cars.filter((car) => {
    const carsByBrand
      = car.brand.toLocaleLowerCase().includes(query.toLocaleLowerCase());

    const carsByColor = car.colorId === selectedColorId;

    return selectedColorId
      ? carsByBrand && carsByColor
      : carsByBrand;
  });

  const handleChangeColorId = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedColorId(Number(event.target.value));
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={handleChangeQuery}
      />

      <select
        value={selectedColorId}
        onChange={handleChangeColorId}
      >
        <option value={0} disabled>Chose a color</option>
        {colorsFromServer.map((color) => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
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

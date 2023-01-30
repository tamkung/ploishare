import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const carBrands = [
  {
    label: "Toyota",
    models: ["Camry", "Corolla", "Rav4"]
  },
  {
    label: "Honda",
    models: ["Civic", "Accord", "CR-V"]
  },
  {
    label: "Tesla",
    models: ["Model S", "Model 3", "Model X"]
  }
];

const CarSelection = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState([]);

  const handleBrandChange = value => {
    setSelectedBrand(value);
    setSelectedModel([]);
  };

  const handleModelChange = value => {
    setSelectedModel(value);
  };

  const selectedCarModels = selectedBrand
    ? carBrands.find(brand => brand.label === selectedBrand).models
    : [];

  return (
    <div>
      <Select
        placeholder="Select a brand"
        value={selectedBrand}
        onChange={handleBrandChange}
        style={{ width: 120 }}
      >
        {carBrands.map(brand => (
          <Option key={brand.label} value={brand.label}>
            {brand.label}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Select a model"
        value={selectedModel}
        onChange={handleModelChange}
        style={{ width: 120, marginLeft: 10 }}
        disabled={!selectedBrand}
        mode="multiple"
      >
        {selectedCarModels.map(model => (
          <Option key={model} value={model}>
            {model}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CarSelection;

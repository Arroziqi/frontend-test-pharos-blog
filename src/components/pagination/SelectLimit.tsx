"use client";

import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectLimitProps {
  limit: number;
  onChange: (value: number) => void;
}

const SelectLimit: React.FC<SelectLimitProps> = ({ limit, onChange }) => {
  return (
    <FormControl size="small" className="w-32">
      <InputLabel id="select-limit-label">Per page</InputLabel>
      <Select
        labelId="select-limit-label"
        value={limit}
        label="Per page"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {[5, 10, 20, 50].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLimit;

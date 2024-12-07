import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider({ name, value, onChange }) {
  const handleChange = (event, newValue) => {
   
    onChange({
      target: {
        name: name,
        value: newValue
      }
    });
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label={name}
        value={value}
        onChange={handleChange}  
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
      />
    </Box>
  );
}

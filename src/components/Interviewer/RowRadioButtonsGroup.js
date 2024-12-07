import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({ name, value, onChange }) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name} 
        value={value} 
        onChange={onChange} 
      >
        <FormControlLabel value="Hold" control={<Radio />} label="Hold" />
        <FormControlLabel value="Rejected" control={<Radio />} label="Reject" />
        <FormControlLabel value="Selected" control={<Radio />} label="Selected" />
      </RadioGroup>
    </FormControl>
  );
}

import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerCheckin({onStartTimeChange}) {
  const [value, setValue] = React.useState('');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        {/* <TimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs('2022-04-17T15:30')}
        /> */}
        <TimePicker
          label="Pick Check-in Time"
          value={value}
          onChange={(newTime) => {
            // Format the selected time
            const formattedTime = dayjs(newTime).format('hh:mm A');
            // Pass the formatted time to the parent component
            onStartTimeChange(formattedTime);
          }}

        //   onTimeChange={(newTime) => {
        //     // Format the selected time
        //     const formattedTime = dayjs(newTime).format('hh:mm A');
        //     // Pass the formatted time to the parent component
        //     onStartTimeChange(formattedTime);
        //   }}

        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
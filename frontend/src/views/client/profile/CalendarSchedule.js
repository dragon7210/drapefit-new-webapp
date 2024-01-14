import React, { useState } from 'react';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavTabs from 'views/client/component/profile/NavTabs';
import { Divider } from '@mui/material';

const CalendarSchedule = () => {
  const [date, setDate] = useState(dayjs('2022-04-07'));
  return (
    <div>
      <NavTabs />
      <Divider />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker onChange={(newDate) => setDate(newDate)} date={date} />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarSchedule;

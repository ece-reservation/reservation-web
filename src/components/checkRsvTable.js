import React, { useState } from 'react';
import moment from 'moment';
import '../css/Table.css'

const CheckRsvTable = () => {
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'];

  const handleClick = (day, time) => {
    if (selectedTime[day]?.[time]) {
      setSelectedTime({
        ...selectedTime,
        [day]: {
          ...selectedTime[day],
          [time]: !selectedTime[day]?.[time]
        }
      });
      setSelectedCount(selectedCount - 1);
    } else if (selectedCount < 6) {
      setSelectedTime({
        ...selectedTime,
        [day]: {
          ...selectedTime[day],
          [time]: !selectedTime[day]?.[time]
        }
      });
      setSelectedCount(selectedCount + 1);
    }
  };

  return (
    <table className="time-reservation-table">
      <thead>
        <tr>
          <th>Time</th>
          {days.map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map(time => (
          <tr key={time}>
            <td>{time}</td>
            {days.map(day => (
              <td
                key={day}
                onClick={() => handleClick(day, time)}
                className={selectedTime[day]?.[time] ? 'booked' : ''}
              >
                {selectedTime[day]?.[time] ? 'booked' : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CheckRsvTable;
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../css/Table.css'
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

function RsvPage(){

  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState('Table1');
  const [noButton, setNoButton] = useState(true);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    if(selectedCount>0){
      setNoButton(false)
      return;
    }
    setNoButton(true);
  },[selectedCount]);

  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_API_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      console.log(response)
      if(response.data){
        alert(`예약내역을 확인합니다.`)
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===401) {
        alert(`로그인이 만료되었습니다.`)
        navigate(`/`);
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });
  },[]);

  const handleTableSelection = table => {
    setSelectedTable(table);
  };

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

  const onClickConfirmRsv = async() => {
    //try {
      const selected = [];
      Object.entries(selectedTime).forEach(([day, times]) => {
        Object.entries(times).forEach(([time, isSelected]) => {
          if (isSelected) {
            selected.push({ day, time });
          }
        });
      });
      console.log(JSON.stringify(selected));
    
      axios.delete(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(function(response){
        if(response.data.statusCode===200){
          console.log(`예약내역 삭제`)
        }
      }).catch(function(error){
        console.log(error);
        if(error.response.data.statusCode===401) {
          alert(`로그인이 만료되었습니다.`)
          navigate(`/`);
        } else if(error.response.data.statusCode===404) {
          alert(`리소스를 찾을 수 없습니다.`)
        } else if(error.response.data.statusCode===500) {
          alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
        }
      });
  }
  

  return (
    <div className='page'>
      <div className='loginform'>
        <HeaderLogin />
        <div>
          <button style={{ background: selectedTable === "Table1" ? "#4285F4" : "#adccff" }} className='errBtn2' onClick={() => handleTableSelection('Table1')}>Table1</button>
          <button style={{ marginLeft: "8px", background: selectedTable === "Table2" ? "#4285F4" : "#adccff" }} className='errBtn2' onClick={() => handleTableSelection('Table2')}>Table2</button>
          </div>
          <h2 style={{textAlign: 'center', color : '#4285F4' }}>{selectedTable}</h2>
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
                <td>{time} - {time+1}</td>
                {days.map(day => (
                  <td
                    key={day}
                    onClick={() => handleClick(day, time)}
                    className={selectedTime[day]?.[time] ? 'booked' : ''}
                  >
                    {selectedTime[day]?.[time] ? '' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <button className='blue-box2' type='button' disabled={noButton} onClick={onClickConfirmRsv}>선택 완료</button>
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;
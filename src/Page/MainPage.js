import React from 'react';
import Header from '../layout/Header';
import {useLocation, useNavigate} from "react-router-dom"

function MainPage(){
  const location = useLocation();
  const user_id = location.state.user_id;
  
  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate("/rsv", {state:{user_id:user_id}});
  }

  const onClickDeleteRsv = () => {
    alert('예약이 취소되었습니다.')
    document.location.href='/main'
    /**
     * 1. api에 user, date, time, table 정보 등을 넣어 예약 취소
     * 2. 예약 취소 완료 후 MainPage를 다시 호출해 예약이 취소된 내용을 반영한다.
     */
  }

  return (
    <div>
      <Header />
      <div>
        <label>메인페이지</label>
      </div >
      <div>
        <div>
          MM-DD  00-00  <button type='button' onClick={onClickDeleteRsv}>예약 취소</button>
        </div>
      </div>
      <div>
          <button type='button' onClick={onClickRsv}>예약 하러가기 {user_id}</button>
      </div >
    </div>
    
  )
}

export default MainPage;
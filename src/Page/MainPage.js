/**
 * To Do List MainPage
 * - api 파싱 후 사용자의 예약 내역을 '00월 00일 00시 테이블0 <예약취소>' 형식으로 구현
 * - 예약 취소 버튼 클릭 시 api로 예약 삭제 내역을 찌르고 새로고침
 */
import React from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import { useNavigate} from "react-router-dom"

function MainPage(){
  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate("/rsv");
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
    <div className='page'>
    <div className='loginform'>
      <HeaderLogin />
      <div style={{ textAlign: 'center', color : '#4285F4' }}>
        <label>메인페이지</label>
      </div >
      <div>
        <div style={{ textAlign: 'center', color : '#4285F4' }}>
          MM-DD  00-00  
          </div>
          <button className= 'errBtn3' type='button' onClick={onClickDeleteRsv}>예약 취소</button>
      </div>
      <div>
          <button className='blue-box2' type='button' onClick={onClickRsv}>예약 하러가기</button>
      </div >
    </div></div>
    
  )
}

export default MainPage;
/**
 * To Do List LoginPage
 * - jwt 토큰을 통한 로그인 방식 구현
 * - api 파싱
 */
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import HeaderUnlogin from '../layout/HeaderUnlogin'
import { useNavigate, Link } from "react-router-dom"
import '../css/login.css'
import axios from 'axios';

export default function Login() {
  const [loginId, setId] = useState('');
  const [loginPw, setPw] = useState('');
  const [notBtnAllow, setNotBtnAllow] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();
  const navigateToAgree = () => {
    navigate("/agreeInform");
  }

  /*이용안내 모달 함수*/
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  /*아이디와 비밀번호가 모두 입력된 경우 로그인 버튼 활성화*/
  useEffect(() => {
    if(loginId.length > 0 && loginPw.length > 0){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[loginId,loginPw]);
  
  const showPwFunc = () => {
    setShowPw(!showPw);
  };
  
  const onClickLogin = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username: loginId,
      password: loginPw
    }).then(function(response){
      if(response.data.access_token){
        localStorage.clear()
        localStorage.setItem('id', response.data.user_id)
        localStorage.setItem('token', response.data.access_token)
        alert("로그인에 성공했습니다!")
        navigate(`/main`)
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===400) {
        alert(`비밀번호가 일치하지 않습니다.`)
      } else if(error.response.data.statusCode===404) {
        alert(`아이디가 존재하지 않습니다.`)
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });
  }

  return(
    <div className='page'>
      <HeaderUnlogin />
    <div className='loginform'>
      <div className='titleWrap'>
        <label className='inputTitle' htmlFor='login_id'>U S E R I D</label>
        <div className='inputWrap'>
        <input 
          className='input'
          type='text'
          name='login_id'
          placeholder='아이디를 입력하세요'
          value={loginId}
          onChange={(e)=>setId(e.target.value)} 
        />
        </div>
      
        <div className='inputTitle' htmlFor='login_pw' style={{marginTop:'5%'}}>P A S S W O R D</div>
        <div className='inputWrap'>
          <input
            className='input'
            type={ showPw ? 'text' : 'password' }
            name='login_pw'
            placeholder='비밀번호를 입력하세요'
            value={loginPw}
            onChange={(e)=>setPw(e.target.value)}
            />
        </div>
        <button  style={{marginTop: '2%'}} className='errBtn' type='button' onClick={showPwFunc}>S H O W</ button>
      </div>

      <Link to ="/findPw" className="forgotPw">
        비밀번호를 잊으셨나요?
      </Link>
    
      <div className='buttonWrap'>
      <div >
        <button className='blue-box' type='button' onClick={onClickLogin} disabled={notBtnAllow} >L O G I N</button>
      </div>
      <div >
        <button className='blue-box' type='button' onClick={navigateToAgree}>S I G N U P</button>
      </div>
      <div >
        <React.Fragment>
          <button className='blue-box'onClick={openModal}>N O T I C E</button>
          <Modal open={modalOpen} close={closeModal} header="이용안내">
            이용안내 사항입니다.
          </Modal>
        </React.Fragment> 
      </div>
    </div></div>
    </div>
  )
}
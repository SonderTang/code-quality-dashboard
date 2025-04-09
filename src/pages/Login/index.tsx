import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './style.module.scss'
import carbonLogo from '../../assets/images/carbon.png';

const Login = () => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setHovered] = useState(false);
  // 状态管理类名
  const [bgStyles, setBgStyles] = useState({
    container: '',
    formBg: ''
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 登录逻辑
    login({ username, password })
      .then(() => {
        // 登录成功后的逻辑，例如跳转
        // ...
      })
      .catch(error => {
        // 处理登录错误
        console.error('登录失败:', error);
      });
  };

  // 点击事件处理器（合并版）
  const handleButtonClick = (type: 'reset' | 'sec' | 'third') => (e: React.MouseEvent) => {
    e.stopPropagation();

    const newStyles = {
      container: '',
      formBg: ''
    };

    switch (type) {
      case 'reset':
        break;
      case 'sec':
        newStyles.container = 'mystyleSec';
        newStyles.formBg = 'mystyleSec';
        break;
      case 'third':
        newStyles.container = 'mystylethird';
        newStyles.formBg = 'mystylethird';
        break;
    }

    setBgStyles(newStyles);
  };

  return (
    <div className={styles.loginPage}>
      <header className={styles.topHeader}></header>
      <img src={carbonLogo} alt="Logo" className={styles.carbon} />
      <div id="mainCoantiner" className={styles.mainContainer}>
        {/* <div className={styles.mainHeader}> */}
        {/* <div className={styles.headerSocial}>
            <ul>
              <li onClick={handleButtonClick('reset')}><a id="nmberone">1</a></li>
              <li onClick={handleButtonClick('sec')}><a id="nmbertwo">2</a></li>
              <li onClick={handleButtonClick('third')}><a id="numberthree">3</a></li>
              <li><a>4</a></li>
            </ul>
          </div> */}
        {/* <div className={styles.folioBtn}>
            <a className={`${styles.folioBtnItem} ${styles.ajax}`} href="https://codepen.io/uiswarup/full/WNLdjqN" target="_blank">
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
              <span className={styles.folioBtnDot}></span>
            </a>
          </div>
        </div> */}


        <div>
          <div className={styles.starsec}></div>
          <div className={styles.starthird}></div>
          <div className={styles.starfourth}></div>
          <div className={styles.starfifth}></div>
        </div>




        <div className={styles.loginForm}>
          <div className={styles.platformTitle}>
            前端代码质量平台
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {/* <label htmlFor="username">用户名</label> */}
              <input
                type="text"
                id="username"
                value={username}
                placeholder='请输入用户名'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              {/* <label htmlFor="password">密码</label> */}
              <input
                type="password"
                id="password"
                placeholder='请输入密码'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>登录</button>
          </form>
        </div>

      </div >
    </div>
  );
};

export default Login;
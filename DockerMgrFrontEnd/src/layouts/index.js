import { Layout, Menu, Breadcrumb, Card } from 'antd';
import { Login } from 'ant-design-pro';
import { Component } from 'react';
import Link from 'umi/link';

import Background from './Background'
import LoginPgae from '@/components/login/index'
import styles from './index.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logedIn: false,
    };
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    // if (!err) {
    //   const { dispatch } = this.props;
    //   dispatch({
    //     type: 'userLogin/login',
    //     payload: {
    //       ...values,
    //       type,
    //     },
    //   });
    // }
  };

  render() {

    if (this.props.location.pathname === '/login') {
      return (<div>
        <Background />
        <LoginPgae />
      </div>);
    }

    if (this.props.location.pathname === '/register') {
      return (<div>
        <Background />
      </div>);
    }

    return (
      <div>
        <Background />
        {this.state.logedIn ?
          (<p>Logedin</p>)
          :
          (<LoginPgae />)}
      </div>
    );
  }
}

export default Root;

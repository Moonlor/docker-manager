import { Card } from 'antd';
import { Login } from 'ant-design-pro';
import { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import styles from './index.css';

const { UserName, Password, Submit } = Login;

@connect(({ loginPage, loading }) => ({
  loginPage,
  submitting: loading.effects['userLogin/login'],
}))
class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: {
          ...values
        },
      });
    }
  };

  render() {

    const { submitting } = this.props;

    return (
      <Card
        hoverable
        className={styles.login}
        title="登录"
        style={{ textAlign: "center" }}
      >
        <div>
          <Login
            onSubmit={this.handleSubmit}
            ref={form => {
              this.loginForm = form;
            }}
          >
            <UserName
              name="email"
              placeholder={"邮箱地址"}
              rules={[
                {
                  required: true,
                  message: "未填写邮箱地址",
                },
                {
                  type: 'email',
                  message: "邮箱格式错误",
                }
              ]}
            />
            <Password
              name="password"
              placeholder={"密码"}
              rules={[
                {
                  required: true,
                  message: "未填写密码",
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            <Submit loading={submitting}>
              登录
            </Submit>
            <Card.Meta title="还未注册？" description={
              <Link to="/register">
                注册
              </Link>
            } />
          </Login>
        </div>
      </Card>
    );
  }
}

export default LoginPage;

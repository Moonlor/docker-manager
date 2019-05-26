import { Card } from 'antd';
import { Component } from 'react';
import Link from 'umi/link';
import { Form, Input, Button} from 'antd';

import styles from './index.css';


const FormItem = Form.Item;

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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

    const { getFieldDecorator } = this.props.form

    return (
      <Card
        hoverable
        className={styles.register}
        title="注册"
        style={{ textAlign: "center" }}
      >
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: "未填写邮箱地址",
                  },
                  {
                    type: 'email',
                    message: "邮箱格式错误",
                  },
                ],
              })(
                <Input size="large" placeholder={"邮箱"} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: "未填写用户名",
                  },
                ],
              })(
                <Input size="large" placeholder={"用户名"} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: "未填写密码",
                  }
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={"密码"}
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                // loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                注册
              </Button>
            </FormItem>
          </Form>
        </div>
        <Card.Meta title="已有账号？" description={
          <Link to="/login">
            登录
          </Link>
        } />
      </Card>
    );
  }
}

export default Form.create()(RegisterPage);

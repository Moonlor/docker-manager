import { Component } from 'react';
import { List, Card, Tag, Timeline, Input, Popconfirm, Button, Modal, Empty, Form } from 'antd';
import { getUserInfo } from '@/utils/authority';
import { connect } from 'dva';
import ReactJson from 'react-json-view'
import { notification } from 'antd';

const InputGroup = Input.Group;

@connect(({ image, loading }) => ({
  imageDetail: image.imageDetail,
  guid: image.guid,
  process: image.process,
  loadingImageDetail: loading.effects['image/inspect'],
}))
class ImageList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      pullVisible: false,
      confirmLoading: false,
      lastLength: 0,
      persistTime: 0,
    };
  }

  confirm = (id, ip) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'image/delete',
      payload: {
        ip: ip,
        id: id
      },
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handlePullCancel = e => {
    this.setState({
      pullVisible: false,
      confirmLoading: false
    });
  };

  inspect = (id, ip) => {
    const { dispatch } = this.props;
    this.setState({
      visible: true,
    });
    dispatch({
      type: 'image/inspect',
      payload: {
        name: id,
        ip: ip
      },
    });
  };

  showPullImageModal = () => {
    this.setState({
      pullVisible: true,
    });
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch} = this.props;
        dispatch({
          type: 'image/pull',
          payload: {
            ip: this.props.ip,
            ...values
          },
        });
        this.setState({
          confirmLoading: true
        });
        notification.success({
          message: '开始拉取镜像'
        })
        this.timer = setInterval(
          () => {
            if (this.props.guid) {
              dispatch({
                type: 'image/query',
                payload: {
                  guid: this.props.guid
                },
              });
              notification.success({
                message: '持续拉取中'
              })
            }
            if (this.props.process) {
              if (this.props.process.length !== 0){
                let lastLength = this.props.process.length;
                if (lastLength === this.state.lastLength ){
                  if (this.state.persistTime > 10){
                    clearInterval(this.timer);
                    this.timer = undefined;
                    this.setState({
                      pullVisible: false
                    })
                    const { id } = getUserInfo();
                    dispatch({
                      type: 'image/getAllImages',
                      payload: {
                        id: id
                      },
                    });
                  } else {
                    let pt = this.state.persistTime;
                    this.setState({
                      persistTime: pt + 1
                    })
                  }
                  
                }
                else{
                  this.setState({
                    lastLength: lastLength
                  })
                }
              }
            }
          },
          1000
        );
      }
    });
  };

  render() {
    const { ip, imageList, loadingImageDetail, imageDetail, process } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state;

    const timeLineitems = process ? process.map((p) =>
      <Timeline.Item>{p.lastUpdateMsg}</Timeline.Item>
    ) : null;

    return (
      <div>

        <Modal
          title="详细配置"
          visible={this.state.visible}
          onOk={this.handleOk}
          width={1000}
          onCancel={this.handleCancel}
        >
          {loadingImageDetail ? <Empty /> :
            <ReactJson src={imageDetail} />
          }
          
        </Modal>

        <Modal
          title="拉取新镜像"
          visible={this.state.pullVisible}
          onOk={this.handleSubmit}
          width={1000}
          onCancel={this.handlePullCancel}
          confirmLoading={confirmLoading}
        >
          <Form onSubmit={this.handleSubmit}>
            <InputGroup compact>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: "未填写镜像名",
                  },
                ],
              })(
                <Input style={{ width: '70%' }} size="large" placeholder={"镜像名"} />
              )}
              {getFieldDecorator('tag', {
                rules: [
                  {
                    required: true,
                    message: "未填写镜像标签",
                  }
                ],
              })(
                <Input style={{ width: '30%' }} size="large" placeholder={"标签"} />
              )}
            </InputGroup>
          </Form>
          {process ? 
          <Timeline style={{marginTop: '16px'}}>
            {timeLineitems}
          </Timeline>
           : null}
        </Modal>

        <Card
          style={{ margin: '0 0 16px 0' }}
          title={'服务器IP地址: ' + ip}
          extra={<Button type="primary" onClick={this.showPullImageModal}>拉取新镜像</Button>}
        >

          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={imageList}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.RepoTags[0]}
                  extra={
                  <Popconfirm
                    placement="leftTop"
                    title="确定要删除该镜像？请确保已经删除通过该镜像启动的容器！"
                    onConfirm={this.confirm.bind(this, item.Id, ip)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>}
                >
                  <div>
                    <Timeline>
                      <Timeline.Item color="green">创建于 <Tag color="green"><code>{item.Created}</code></Tag></Timeline.Item>
                      <Timeline.Item color="blue">大小 <Tag color="blue"><code>{parseInt(item.Size)/10e5 + ' MB'}</code></Tag></Timeline.Item>
                      <Timeline.Item color="blue">Id <Tag color="blue"><code>{ item.Id.slice(0, 30) + '...' }</code></Tag></Timeline.Item>
                    </Timeline>
                  </div>
                  
                  <Button type="primary" onClick={this.inspect.bind(this, item.Id, ip)}>详细配置</Button>

                </Card>
              </List.Item>
            )}
          />

        </Card>
        
      </div>
    );
  }
}

export default Form.create()(ImageList);
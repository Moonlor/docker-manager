import { Component } from 'react';
import { List, Card, Tag, Timeline, Popconfirm, Button } from 'antd';
import { getUserInfo } from '@/utils/authority';


class ImageList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  confirm = (id) => {
    const { dispatch } = this.props;
    const { id: userId } = getUserInfo();
    // dispatch({
    //   type: 'container/delete',
    //   payload: {
    //     id: id,
    //     userId: userId
    //   },
    // });
  };

  render() {
    const { ip, imageList } = this.props;

    return (
      <div>
        <Card
          style={{ margin: '0 0 16px 0' }}
          title={'服务器IP地址: ' + ip}
          extra={null}
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
                      onConfirm={this.confirm.bind(this, item.Id)}
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
                </Card>
              </List.Item>
            )}
          />

        </Card>
        
      </div>
    );
  }
}

export default ImageList;
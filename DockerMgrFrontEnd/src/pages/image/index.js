import { Component } from 'react';
import { Tabs, Button, Card, Empty, Modal, Form, Alert, List, Skeleton } from 'antd';
import { connect } from 'dva';

import ImageList from './components/ImageList'

@connect(({ image, loading }) => ({
  images: image.imageList,
  loadingGetAllImages: loading.effects['image/getAllImages'],
}))
class ImagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    
  }

  stop = (id, ip) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'container/stop',
      payload: {
        id: id,
        ip: ip,
      },
    });
  };

  render() {

    const gridStyle = {
      width: '50%',
      textAlign: 'center',
    };

    const { servers, images, loadingGetAllImages, loadingRemove, confirmLoading } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form

    let data = []
    if (images) {
      for (var ip in images) {
        if (images.hasOwnProperty(ip)) {
          data.push({
            "ip": ip,
            "imageList": images[ip]
          })
        }
      }
    }

    return (
      <div>

        <div style={{ marginTop: '16px' }}>
          {loadingGetAllImages || !images ? <Empty /> :
            <List
              itemLayout="vertical"
              dataSource={data}
              loading={loadingGetAllImages}
              renderItem={item => (
                <List.Item>
                  <ImageList ip={item.ip} imageList={item.imageList} dispatch={this.props.dispatch} />
                </List.Item>
              )}
            />
            }
        </div>
      </div>
    );
  }
}

export default Form.create()(ImagePage);
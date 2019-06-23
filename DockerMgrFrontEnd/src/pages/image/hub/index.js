import { Component } from 'react';
import { Input, Button, Card, Empty, Modal, Form, Alert, List, Skeleton } from 'antd';
import { connect } from 'dva';

import HubImageDetail from '../components/HubImageDetail'

const { Search } = Input;

@connect(({ image, loading }) => ({
  images: image.imageList,
  searchResultImages: image.searchResult,
  loadingGetAllImages: loading.effects['image/getAllImages'],
  loadingSearch: loading.effects['image/search'],
}))
class ImageHubPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {

  }

  search = (keyWord) => {
    const { dispatch } = this.props;
    const { images} = this.props;

    var ip = null;
    for (var i in images) {
      if (images.hasOwnProperty(i)) {
        ip = i;
      }
    }

    dispatch({
      type: 'image/search',
      payload: {
        ip: ip,
        keyWord: keyWord
      },
    });
  };

  render() {

    const { searchResultImages, images, loadingGetAllImages, loadingSearch} = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form

    return (
      <div>

        <Search placeholder="搜索 DockerHub 中的镜像" style={{width:'50%'}} onSearch={value => this.search(value)} enterButton />

        <div style={{ marginTop: '16px' }}>
          {loadingGetAllImages || !images ? <Empty /> :
            <List
              itemLayout="vertical"
              dataSource={searchResultImages}
              loading={loadingSearch}
              grid={{ gutter: 16, column: 2 }}
              renderItem={item => (
                <List.Item>
                  <HubImageDetail image={item} dispatch={this.props.dispatch} />
                </List.Item>
              )}
            />
          }
        </div>
      </div>
    );
  }
}

export default Form.create()(ImageHubPage);
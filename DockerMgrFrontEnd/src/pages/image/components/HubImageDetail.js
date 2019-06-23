import { Component } from 'react';
import { Card, Icon, Button, Tag } from 'antd';

class HubImageDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { image } = this.props;

    return (
      <div>
        <Card
          style={{ margin: '0 0 16px 0' }}
          title={<div>{image.is_official ? <Tag color="green">官方镜像</Tag> : null }{image.name}</div>}
          extra={<div><Icon type="star" theme="filled"/>{image.star_count}</div>}
        >
          <p>{image.description}</p>
          {image.is_official ?
            <div>
              <a target="_Blank" rel="noopener noreferrer" href={`https://hub.docker.com/_/${image.name}`} style={{ marginRight: '16px' }}><Button type="primary" icon="eye">查看详细信息</Button></a>
              <a target="_Blank" rel="noopener noreferrer" href={`https://hub.docker.com/_/${image.name}?tab=tags`}><Button type="primary" icon="eye">查看Tag</Button></a>
            </div>
            :
            <div>
              <a target="_Blank" rel="noopener noreferrer" href={`https://hub.docker.com/r/${image.name}`} style={{ marginRight: '16px' }}><Button type="primary" icon="eye">查看详细信息</Button></a>
              <a target="_Blank" rel="noopener noreferrer" href={`https://hub.docker.com/r/${image.name}/tags`}><Button type="primary" icon="eye">查看Tag</Button></a>
            </div>
          }
        </Card>

      </div>
    );
  }
}

export default HubImageDetail;
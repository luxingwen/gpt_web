import styles from './index.less';
import { Row, Col } from 'antd';

import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';

export default function IndexPage() {
  return (
    <div>
      <HeaderComponent />
      <ContainerComponent>
        <Row>
          <Col span={12}>hhh</Col>
          <Col span={12}>aaa</Col>
        </Row>

        <Row>
          <h3>最近使用</h3>
        </Row>
      </ContainerComponent>
    </div>
  );
}

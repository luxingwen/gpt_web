import { Col, Layout, Row } from 'antd';
import styled from 'styled-components';
import './Container.less';

const { Content } = Layout;

const StyledContent = styled(Content)`
  margin-top: 0;

  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

const Container = ({ children }) => {
  return (
    <Layout className="container">
      <StyledContent>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            {children}
          </Col>
        </Row>
      </StyledContent>
    </Layout>
  );
};

export default Container;

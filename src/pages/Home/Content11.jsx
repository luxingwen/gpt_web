import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import React from 'react';
import { getChildrenToRender } from './utils';

class Content11 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
        >
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <Button {...dataSource.button.children.a}>
            {dataSource.button.children.a.children}
          </Button>
        </TweenOne>
      </OverPack>
    );
  }
}

export default Content11;

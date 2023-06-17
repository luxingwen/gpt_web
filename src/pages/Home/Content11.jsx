import section1_1 from '@/assets/images/home/8a8e634cd8153a7c9c683c24d03d256f.jpg';
import section1_2 from '@/assets/images/home/a6374200aa342b2baadefc02405aa30c.jpg';
import section1_3 from '@/assets/images/home/bd7cc4875ef334b4b74e3dbf3f4dbfee.jpg';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import React from 'react';
import { getChildrenToRender } from './utils';

import section2_3 from '@/assets/images/home/3aa4388b12235ccbaf2fa6a942b4eea4.jpg';
import section2_2 from '@/assets/images/home/702d63d2af90461a99d45d994d30f8a4.jpg';
import section2_1 from '@/assets/images/home/ed070d234b7e7e9fad9d45c0e08a25b5.jpg';

import section3_1 from '@/assets/images/home/34565.jpg';

class Content11 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack {...props} {...dataSource.OverPack}>
        <div className="area-box">
          <div className="item1"></div>
          <div className="item2"></div>
          <div className="item3"></div>
          <div className="item10"></div>
          <div className="item4"></div>
          <div className="item5"></div>
          <div className="item6"></div>
          <div className="item11"></div>
          <div className="item7"></div>
          <div className="item8"></div>
          <div className="item9"></div>
          <div className="item12"></div>
        </div>

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
        {dataSource.show == 'Content112DataSource' && (
          <div className="content11-comp-imgs-box">
            {[section1_1, section1_2, section1_3].map((i) => (
              <img
                key={i}
                src={i}
                alt=""
                width={1170}
                height={2532}
                loading="lazy"
              />
            ))}
          </div>
        )}
        {dataSource.show == 'Content111DataSource' && (
          <div className="content11-comp-imgs-box">
            {[section2_1, section2_2, section2_3].map((i) => (
              <img
                key={i}
                src={i}
                alt=""
                width={1170}
                height={2532}
                loading="lazy"
              />
            ))}
          </div>
        )}
        {dataSource.show == 'Content113DataSource' && (
          <div className="content11-comp-imgs-box one-img">
            <img
              src={section3_1}
              alt=""
              width={1170}
              height={2532}
              loading="lazy"
              className="w100"
            />
          </div>
        )}
      </OverPack>
    );
  }
}

export default Content11;

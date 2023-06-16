import React from 'react';

import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => <Dropdown overlayClassName={cls} {...restProps} />;

export default HeaderDropdown;

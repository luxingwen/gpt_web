import React, { useState } from 'react';

import '../index.less';

interface PersonaliseProps {}
const Personalise: React.FC<PersonaliseProps> = ({}) => {
  const [headerState, setHeaderState] = useState<number>(0);

  return <>个性化数字人</>;
};

export default Personalise;

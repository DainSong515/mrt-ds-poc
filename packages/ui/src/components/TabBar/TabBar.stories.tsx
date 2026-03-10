import React, { useState } from 'react';

import { TabBar } from './TabBar';

export default {
  title: 'Components/TabBar',
  component: TabBar,
};

const accommodationTabs = [
  { key: 'domestic', label: '국내 숙소' },
  { key: 'overseas', label: '해외 숙소' },
  { key: 'package', label: '패키지 여행', badge: true },
];

export const Default = () => {
  const [activeKey, setActiveKey] = useState('domestic');
  return (
    <TabBar
      tabs={accommodationTabs}
      activeKey={activeKey}
      onChange={setActiveKey}
    />
  );
};

export const SmallSize = () => {
  const [activeKey, setActiveKey] = useState('domestic');
  return (
    <TabBar
      tabs={accommodationTabs}
      activeKey={activeKey}
      onChange={setActiveKey}
      size="small"
    />
  );
};

export const WithDisabled = () => {
  const [activeKey, setActiveKey] = useState('domestic');
  return (
    <TabBar
      tabs={[
        { key: 'domestic', label: '국내 숙소' },
        { key: 'overseas', label: '해외 숙소' },
        { key: 'package', label: '패키지 여행', badge: true, disabled: true },
      ]}
      activeKey={activeKey}
      onChange={setActiveKey}
    />
  );
};

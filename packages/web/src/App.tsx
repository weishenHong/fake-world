import { App as AntdApp, ConfigProvider,FloatButton } from 'antd';
import { useTranslation } from 'react-i18next';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Screen from './components/Screen';
import TopPopover from './components/TopPopover';
import Tour from './components/Tour';
import { ANTD_LANG_MAP } from './i18n';
import { useState } from 'react';

const App = () => {
  // const inShareMode = !!window.__SHARE_KEY__;
  const { i18n } = useTranslation();
  const [dev, setDev] = useState(false)
  return (
    <ConfigProvider locale={ANTD_LANG_MAP[i18n.language as keyof typeof ANTD_LANG_MAP]}>
      <FloatButton  description="Dev" shape="square" onClick={() => 
        {
          console.log(!dev);
          setDev(!dev)
        } } />
      <div className="grid min-h-screen grid-cols-3 max-lg:grid-cols-1">
        {dev && (
          <AntdApp >
            <LeftPanel />
          </AntdApp>
        )}
        <div
          className="flex  justify-center overflow-auto border-l border-r border-dashed border-orange-400 max-lg:border-none"
          id="center"
        >
          <div className="border">
            <TopPopover>
              <Screen />
            </TopPopover>
          </div>
        </div>
        { dev && <RightPanel />}
      </div>
      <Tour />
    </ConfigProvider>
  );
};

export default App;

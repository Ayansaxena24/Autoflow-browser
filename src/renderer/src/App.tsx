import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './assets/styles.css';
import AddressBar from './components/AddressBar';
import Tabs from './components/Tabs';
import useWindowsDimensions from './hooks/useWindowsDimensions';
import Splash from './components/Splash';

interface TabType {
  id: string;
  url: string;
  title?: string;
}

function App(): JSX.Element {
  const [tabs, setTabs] = useState<TabType[]>([{ id: uuidv4(), url: '' }]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const windowDimensions = useWindowsDimensions();
  const webviewRefs = useRef<{ [key: string]: HTMLWebViewElement | null }>({});

  // Get the current active tab
  const activeTab = tabs.find((tab) => tab.id === activeTabId)!;

  const handleUrlChange = (url: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId ? { ...tab, url } : tab
      )
    );
  };

  const handleNewTab = () => {
    const newTabId = uuidv4();
    setTabs((prevTabs) => [...prevTabs, { id: newTabId, url: '' }]);
    setActiveTabId(newTabId);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== tabId);

      // If closing the active tab, switch to another tab
      if (tabId === activeTabId) {
        setActiveTabId(updatedTabs[0]?.id || '');
      }

      // Ensure at least one tab exists
      return updatedTabs.length ? updatedTabs : [{ id: uuidv4(), url: '' }];
    });
  };

  useEffect(() => {
    const webview = webviewRefs.current[activeTab.id];
    if (webview) {
      const handleTitleUpdated = (event: any) => {
        const title = event.title || event.detail?.title;
        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === activeTabId ? { ...tab, title } : tab
          )
        );
      };

      webview.addEventListener('page-title-updated', handleTitleUpdated as EventListener);

      return () => {
        webview.removeEventListener('page-title-updated', handleTitleUpdated as EventListener);
      };
    }
    return;
  }, [activeTabId, tabs]);

  return (
    <div className="flex flex-col h-screen">
      <Tabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />
      <AddressBar setUrl={handleUrlChange} url={activeTab.url} />
      {activeTab.url ? (
        <webview
          ref={(el) => {
            if (el) webviewRefs.current[activeTab.id] = el;
          }}
          src={`${activeTab.url.includes('https://') ? '' : 'https://'}${
            activeTab.url
          }`}
          style={{
            height: windowDimensions.height - 100,
            width: '100%',
          }}
        ></webview>
      ) : (
        <Splash />
      )}
    </div>
  );
}

export default App;

import React from 'react'
import '../styles.css';

interface TabType {
  id: string
  url: string
  title?: string
}

interface TabsProps {
  tabs: TabType[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
  onNewTab: () => void
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onTabClose, 
  onNewTab 
}) => {
    const truncateTitle = (title: string, maxLength: number = 10): string => {
        return title.length > maxLength 
          ? `${title.slice(0, maxLength)}...` 
          : title
      }

  return (
    <div className="tabs-container flex items-center bg-gray-100 p-1">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`
            tab 
            flex 
            items-center 
            p-2 
            mx-1 
            rounded 
            cursor-pointer 
            ${activeTabId === tab.id ? 'bg-white shadow' : 'hover:bg-gray-200'}
          `}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="mr-2 text-sm">
            {truncateTitle(tab.title || 'New Tab')}
          </span>
          {tabs.length > 1 && (
            <button 
              className="close-tab ml-2 hover:bg-red-100 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(tab.id)
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button 
        className="new-tab-btn ml-2 bg-blue-100 hover:bg-blue-200 rounded p-1"
        onClick={onNewTab}
      >
        +
      </button>
    </div>
  )
}

export default Tabs
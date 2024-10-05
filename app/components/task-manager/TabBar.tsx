import { useState } from "react"
import { Tab as TabInterface } from "./types"
import Tab from "./Tab"

interface TabBarProps {
    tabs: TabInterface[],
    selectedTabId: number | null
    handleTabSelect: (tabId: number | null) => void
}

export default function TabBar({ tabs, selectedTabId, handleTabSelect }: TabBarProps) {
    
    return (
        <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
            <Tab name="Upcoming" selected={selectedTabId == null} onClick={()=>{handleTabSelect(null)}}/>
            {tabs.map((tab, index) => <Tab key={index} name={tab.name} selected={selectedTabId == tab.id} onClick={()=>{handleTabSelect(tab.id)}}/>)}
        </div>
    )
}
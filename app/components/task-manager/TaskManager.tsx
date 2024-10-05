"use client"

import { Tab as TabInterface } from "./types"
import { useState } from "react"
import Tab from "./Tab"

interface TaskManagerProps {
    tabList: TabInterface[]
}

export default function TaskManager({ tabList }: TaskManagerProps) {
    const [tabs, setTabs] = useState(tabList)
    const [selectedTabId, setSelectedTabId] = useState<number | null>(null)

    return (
        <div className="border w-[800px] h-96 flex flex-col items-center gap-5">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTabId == null} onClick={()=>{setSelectedTabId(null)}}/>
                {tabs.map((tab, index) => <Tab key={index} name={tab.name} selected={selectedTabId == tab.id} onClick={()=>{setSelectedTabId(tab.id)}}/>)}
            </div>
        </div>
    )
}
"use client"

import { Tab } from "./types"
import { useState } from "react"
import TabBar from "./TabBar"

interface TaskManagerProps {
    tabList: Tab[]
}

export default function TaskManager({ tabList }: TaskManagerProps) {
    const [tabs, setTabs] = useState(tabList)
    const [selectedTabId, setSelectedTabId] = useState<number | null>(null)

    return (
        <div className="border w-[800px] h-96">
            <TabBar tabs={tabs} selectedTabId={selectedTabId} handleTabSelect={setSelectedTabId}/>
        </div>
    )
}
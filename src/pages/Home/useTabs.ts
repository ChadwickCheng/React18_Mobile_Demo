import { useEffect, useState } from 'react'
import type { ChannelItem } from '@/apis/list'
import { fetchChannelAPI } from '@/apis/list'

function useTabs(){
  const [channels, setChannels] = useState<ChannelItem[]>([])
  useEffect(()=>{
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI()
        setChannels(res.data.data.channels)
      } catch (error) {
        throw new Error('获取频道列表失败')
      }
    }
      getChannels()
  },[])
  return {
    channels
  }
}

export {
  useTabs
}
import { Image, InfiniteScroll, List } from 'antd-mobile'
// mock数据
import { useEffect, useState } from 'react'
import { ListRes, fetchListAPI } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
  channelId: string
}

const HomeList = (props: Props) => {
  const { channelId } = props
  // 获取列表数据
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: ''+new Date().getTime()
  })
  useEffect(()=>{
    const getList = async ()=>{
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: ''+new Date().getTime()
        })
        setListRes({
          results: res.data.data.results,
          pre_timestamp: res.data.data.pre_timestamp
        })
      } catch (error) {
        throw new Error('fetch list error')
      }
    }
    getList()
  },[channelId])

  // 开关 是否还有更多数据
  /*
  上拉加载必要条件：hasMore为true threshold小于阈值
  */
  const [hasMore, setHasMore] = useState(true)
  // 加载更多
  const loadMore = async ()=>{
    // 加载下一页核心逻辑
    // console.log('load more')
    // setHasMore(false)
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp
      })
      // 拼接新数据 存入下次时间戳
      setListRes({
        results: [...listRes.results,...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      })
      // 判断是否还有更多数据
      if(res.data.data.results.length===0){
        setHasMore(false)
      }
    } catch (error) {
      throw new Error('fetch list error')
    }
  }

  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }
  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            onClick={()=>goToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10}/>
    </>
  )
}

export default HomeList
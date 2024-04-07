import ReactDOM from 'react-dom/client'
import router from './router'
import { RouterProvider } from 'react-router-dom'

import { fetchChannelAPI } from './apis/list'
fetchChannelAPI().then((res) => {
  console.log(res.data.data.channels)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
  </RouterProvider>
)

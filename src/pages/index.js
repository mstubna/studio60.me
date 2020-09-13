import React, { useEffect } from 'react'
import { isShowtime } from '../utilities'

const IndexPage = () => {
  useEffect(() => {
    if (isShowtime()) {
      window.location = '/showtime'
    } else {
      window.location = '/countdown'
    }
  }, [])

  return <></>
}

export default IndexPage

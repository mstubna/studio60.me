import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'

const useAnimationFrame = (callback) => {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const useIsShowtime = () => {
  const [elapsed, setElapsed] = useState(0)

  useAnimationFrame((deltaTime) => {
    setElapsed((prevElapsed) => prevElapsed + deltaTime)
  })

  useEffect(() => {
    if (isShowtime()) {
      window.location = '/showtime'
    } else {
      window.location = '/countdown'
    }
  }, [elapsed])
}

const showtime = DateTime.fromISO('2020-09-20T09:00:00', { zone: 'America/New_York' })
const quote = 'Time flies like an arrow, fruit flies like a banana.'
const quoteAuthor = 'GMarx'

const getNow = () => {
  return DateTime.local()
}

const getHoursMinutesSecondsUntilShowtime = () => {
  const duration = showtime.diff(getNow())
  return duration.toFormat('dd hh mm ss').split(' ')
}

const isShowtime = () => {
  return getNow() > showtime
}

export {
  useAnimationFrame,
  showtime,
  quote,
  quoteAuthor,
  getNow,
  getHoursMinutesSecondsUntilShowtime,
  isShowtime,
  useIsShowtime,
}

'use client'
import { useEffect } from 'react'

// 에러 컴포넌트는 반드시 클라이언트 컴포넌트

interface Props {
  error: Error
  reset: () => void
}

export default function Error ({ error, reset }: Props) {
  useEffect(() => {
    console.error(error.message)
  }, [])
  return (
    <>
        <h1>에러페이지</h1>
        <button onClick={() => {
          reset()
        }}></button>
    </>
  )
}

// #참고
// useEffect는 렌더링 될때마다 발생되는 hook
//  useEffect(()=> {logic},[]) => component가 마운트되었을때마다
//  useEffect(()=> {logic}) => component가 마운트되었을때 한번
//  useEffect(()=> {logic},[name]) => component가 'name'이 업데이트 될때마다

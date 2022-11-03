import React, { useEffect } from 'react'
import { fetchFaqs } from './api/faqs'

export default function faqs() {
    useEffect(()=>{
        fetchFaqs()
    },[])
  return (
    <div>schedule</div>
  )
}


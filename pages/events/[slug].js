import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { eventSlug } from '../api/events';

export default function Slug() {
    const router = useRouter()
    const [events,setevents] = useState(null)
    useEffect(()=>{
        if(!router.isReady) return;
        eventSlug(router.query.slug).then((data)=>{
          setevents(data)
        })
    },[router.isReady])
  return (
    <div>
      {console.log(events)}
    </div>
  )
}


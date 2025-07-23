import React from 'react'

export default function Prayer({name, time,formatTime}) {
  return (
<div className='prayerCard'>
<div className='name'>{name}</div>
        <div className='time'>{formatTime( time)}</div>
</div>
    

  )
}

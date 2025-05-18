import React from 'react'

function JobApplicantLists() {

  const ApplicantList = [
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 3,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },
    {
      id: 1,
      name: "Yossapan",
      resume: "link",
      mail: "yossapan.r@gmail.com"
    },
    {
      id: 2,
      name: "Bew",
      resume: "link",
      mail: "bew.b@gmail.com"
    },
    {
      id: 10,
      name: "Pat",
      resume: "link",
      mail: "pat.npc@gmail.com"
    },

  ]
  return (
    <div>
      <h1 className='pb-2 font-semibold'>Job Applicant lists</h1>
      <div className='bg-black rounded-2xl p-2 m-2 h-full '>
        <div className='bg-dpink grid grid-cols-12 rounded-t-2xl p-2 font-semibold text-white'> 
          <h3 className='col-span-1  text-center'>ID</h3>
          <h3 className='col-span-3 '>Name</h3>
          <h3 className='col-span-2  text-center'>Resume</h3>
          <h3 className='col-span-6  text-center'>Contact info</h3>
        </div>

        <div className='overflow-y-auto h-[500px]'>
          {ApplicantList.map((list) => (
          <div key={list.id} className='grid grid-cols-12 py-1 bg-white overflow-x-hidden'>
            <p className='col-span-1 text-center'>{list.id}</p>
            <p className='col-span-3 '>{list.name}</p>
            <p className='col-span-2 text-center'>{list.resume}</p> 
            <p className='col-span-6 pl-18'>{list.mail}</p>
        </div>
        
        ))}
        </div>
      </div>

    </div>
  )
}

export default JobApplicantLists

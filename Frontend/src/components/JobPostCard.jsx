import React from 'react'

function JobPostCard() {
    const PostJobLists = [
  {
    id: 1,
    title: "HR Generalist",
    qualifications: "Excellent communication and interpersonal skills, ethics, andhdsjfhgjklfghjklvnbnvbnm,",
    location: "Chatuchak",
    salary: "-"
  },
  {
  id: 2,
  title: "Software Engineer",
  qualifications: "Proficient in JavaScript, React, and version control systems...",
  location: "Bang Na",
  salary: "฿45,000 - ฿60,000"
},
{
  id: 3,
  title: "Marketing Coordinator",
  qualifications: "Strong creative writing skills, experience with digital campaigns...",
  location: "Sathorn",
  salary: "Negotiable"
}

  
];
  return (
    <div>
        <div className='flex justify-between pb-2'>
            <h1 className='font-semibold'>Job posts</h1>
            <a href="">+ Create new post</a>
        </div>
        <div className='flex flex-row gap-[37px] overflow-x-auto'>
            {PostJobLists.map((post) => (
                    <div id="card" key={post.id} className='flex flex-col bg-pink-200 rounded-2xl px-2 py-4 sm:p-6 min-w-[280px]'>
                        <div className='flex flex-row justify-between'>
                            <h2 className='line-clamp-2 font-medium'>{post.title}</h2>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="41" height="42" viewBox="0 0 41 42" fill="none">
    <path d="M24.436 8.77578L29.3082 13.6479M11.9583 12.4589H6.83333C6.38026 12.4589 5.94573 12.6389 5.62536 12.9593C5.30498 13.2797 5.125 13.7142 5.125 14.1673V31.2506C5.125 31.7037 5.30498 32.1382 5.62536 32.4586C5.94573 32.779 6.38026 32.9589 6.83333 32.9589H25.625C26.0781 32.9589 26.5126 32.779 26.833 32.4586C27.1533 32.1382 27.3333 31.7037 27.3333 31.2506V23.5631M31.4487 6.63353C31.7688 6.95351 32.0227 7.33342 32.196 7.75156C32.3692 8.16969 32.4584 8.61787 32.4584 9.07047C32.4584 9.52308 32.3692 9.97125 32.196 10.3894C32.0227 10.8075 31.7688 11.1874 31.4487 11.5074L19.7569 23.1992L13.6667 24.4173L14.8847 18.3271L26.5765 6.63524C26.8963 6.31499 27.276 6.06092 27.694 5.88757C28.112 5.71423 28.5601 5.625 29.0126 5.625C29.4652 5.625 29.9132 5.71423 30.3313 5.88757C30.7493 6.06092 31.129 6.31499 31.4487 6.63524V6.63353Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></div>
                        </div>
                        <hr />
                        <div className='flex gap-[26px] flex-col pb-5'>
                            <p className='line-clamp-3'>Qualification: {post.qualifications}</p>
                            <p className='line-clamp-2'>Location: {post.location}</p>
                            <p className='line-clamp-1'>Salary: {post.salary}</p>
                        </div>
                
                    <button className='btn btn-dpink rounded-2xl text-white py-2 '>Publish</button>
                {/* <button>View Applicants</button> */}
                    </div>
            ))}
            
        </div>
    </div>
  )
}

export default JobPostCard

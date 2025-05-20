import React, { useState } from 'react'
//import JobPostCard from '../components/JobPostCard'
//import JobApplicantLists from '../components/JobApplicantLists'
import { Link as ScrollLink } from 'react-scroll';
import RecommendCompany from '../components/RecommendCompany';
import { Link, useNavigate } from 'react-router-dom';

function CompanyDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  // job post
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfirmPublishPopup, setShowConfirmPublishPopup] = useState(false);
  const [showPublishSuccessPopup, setShowPublishSuccessPopup] = useState(false);
  // const [message, setMessage] = useState();
  // to navigate to edit 
  const navigateEditId = useNavigate();
  const [postJobLists, setPostJobLists] = useState([
    {
      id: 1,
      title: "HR Generalist",
      qualifications: "Excellent communication and interpersonal skills, ethics, andhdsjfhgjklfghjklvnbnvbnm,",
      location: "Chatuchak",
      salary: "-",
      publish: false
    },
    {
      id: 2,
      title: "Software Engineer",
      qualifications: "Proficient in JavaScript, React, and version control systems...",
      location: "Bang Na",
      salary: "฿45,000 - ฿60,000",
      publish: false
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      qualifications: "Strong creative writing skills, experience with digital campaigns...",
      location: "Sathorn",
      salary: "Negotiable",
      publish: false
    }
  ]);
  
  // Click edit go to edit page 
  const handleEdit = (id) => {
    navigateEditId(`/EditJobPost/${id}`);
  };

  //Edit: Click button change follow each id click  
  const handleClick = (id) => {
    setIsPublishing(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const [selectedPublishId, setSelectedPublishId] = useState(null);
  
  // Publish 
  const handlePublish = (e, id) => {
    e.preventDefault();
    // console.log(jobData); // ส่งไป backend หรือเก็บใน local ก็ได้
    setSelectedPublishId(id);
    setShowConfirmPublishPopup(true); 
  };

  const handlePublishSuccess = (e) => {
    e.preventDefault();
    // console.log();
    setPostJobLists(prev =>
      prev.map(post =>
        post.id === selectedPublishId ? {...post, publish: true} : post
      )
    );
    setShowConfirmPublishPopup(false);
    setShowPublishSuccessPopup(true); 
    setTimeout(()=>{
      setShowPublishSuccessPopup(false);
    },3000);
  };
    // Job Applicants
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

  ]; 
  const [showApplicants, setShowApplicants] = useState(false);
  // const handleShowApplicants = (e, id) => {
  //   e.preventDefault();
  //   setSelectedPublishId(id); 
  // };
  // };
  return (
    <div className='pt-[80px] px-[30px]
    sm:pt-[102px] sm:px-[80px] bg-lgray min-h-screen'>
      <div className='flex gap-[10px] sm:gap-[50px] pb-5'>
        <ScrollLink to="section1" smooth={true} duration={500} offset={-80} className="hover:underline underline-offset-4 cursor-pointer text-black text-xl">
          company profile
        </ScrollLink>
        <ScrollLink to="section2" smooth={true} duration={500} offset={-80} className="hover:underline underline-offset-4 cursor-pointer text-black">
          Job Posts
        </ScrollLink>
        <ScrollLink to="section3" smooth={true} duration={500} offset={-80} className="hover:underline underline-offset-4 cursor-pointer text-black">
          View Applicants
        </ScrollLink>
      </div>

      <div className='flex flex-col gap-[50px] sm:gap-[100px]'>
        {/* profile */}
        <div 
          id="section1"
          className='flex flex-col sm:flex-row items-start p-4 justify-start sm:items-center sm:gap-5 self-stretch rounded-2xl'
          style={{background: 'linear-gradient(270deg, #E60278 0%, #85124E 25%, #242124 59.62%)',}}>

          {/* pic */}
          <div className='w-[80px] h-[80px] p-2 bg-lgray rounded-2xl flex-initial'>
            <img src="" alt="Company Logo" />
          </div>

          {/* Name + See more */}
          <div className='h-[143px] flex flex-col justify-center text-white'>
            <div className='flex flex-row justify-start gap-2'>
              <h1 className='font-normal text-2xl'>Company Name</h1>
              {/* edit button */}
              <Link to="/EditCoProfile">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Link>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
              See more &gt;
            </a>
            {isOpen && (
              <div className="relative">
                <RecommendCompany />
                <button 
                  className="absolute top-2 right-2 text-white" 
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Job Posts */}
        <div id="section2">
          <div className='flex justify-between pb-2 bg-lgray'>
            <h1 className='text-2xl font-bold'>Job posts</h1>
            <Link to="/CJobPostForm">+ Create new post</Link>
          </div>
          
          <div className='flex flex-row gap-[37px] overflow-x-auto'>
            {postJobLists.map((post) => (
              <div id="card" key={post.id} className='flex flex-col bg-white border-2 rounded-2xl px-2 py-4 sm:p-6 size-[300px] h-[360px] flex-none'>
                <div className='flex flex-row justify-between'>  
                  <h2 className='line-clamp-2 text-2xl'>{post.title}</h2>
                  <button onClick={() => handleEdit(post.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="42" viewBox="0 0 41 42" fill="none">
                      <path d="M24.436 8.77578L29.3082 13.6479M11.9583 12.4589H6.83333C6.38026 12.4589 5.94573 12.6389 5.62536 12.9593C5.30498 13.2797 5.125 13.7142 5.125 14.1673V31.2506C5.125 31.7037 5.30498 32.1382 5.62536 32.4586C5.94573 32.779 6.38026 32.9589 6.83333 32.9589H25.625C26.0781 32.9589 26.5126 32.779 26.833 32.4586C27.1533 32.1382 27.3333 31.7037 27.3333 31.2506V23.5631M31.4487 6.63353C31.7688 6.95351 32.0227 7.33342 32.196 7.75156C32.3692 8.16969 32.4584 8.61787 32.4584 9.07047C32.4584 9.52308 32.3692 9.97125 32.196 10.3894C32.0227 10.8075 31.7688 11.1874 31.4487 11.5074L19.7569 23.1992L13.6667 24.4173L14.8847 18.3271L26.5765 6.63524C26.8963 6.31499 27.276 6.06092 27.694 5.88757C28.112 5.71423 28.5601 5.625 29.0126 5.625C29.4652 5.625 29.9132 5.71423 30.3313 5.88757C30.7493 6.06092 31.129 6.31499 31.4487 6.63524V6.63353Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <hr className='my-2' />
                <div className='flex gap-[26px] flex-col pb-5'>
                  <p className='line-clamp-3'>Qualification: {post.qualifications}</p>
                  <p className='line-clamp-2'>Location: {post.location}</p>
                  <p className='line-clamp-1'>Salary: {post.salary}</p>
                </div>
                          
                {post.publish ? (
                  <ScrollLink to="section3">
                    <button className='custom-btn-full btn-dpink btn-dpink:hover' onClick={() => setShowApplicants(true)}>
                      View Applicants
                    </button>
                  </ScrollLink>
                ) : (
                  <button onClick={(e) => handlePublish(e, post.id)} className='custom-btn-full btn-dpink btn-dpink:hover'>
                    publish
                  </button>
                )}
                                
                {showConfirmPublishPopup && (
                  <>
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40">
                    </div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-6 sm:px-10 py-3 sm:py-5 rounded shadow-lg z-50 flex flex-col items-center justify-center gap-5">
                      <div className='flex flex-col items-center justify-center'>
                        <p>Are you sure you want to publish</p>
                        <p>this job post</p> 
                      </div>
                      <div className='flex gap-2'>
                        <button className='custom-btn btn-dpink btn-dpink:hover' onClick={() => setShowConfirmPublishPopup(false)}>back</button>
                        <button className='custom-btn btn-black btn-black:hover' onClick={handlePublishSuccess}>Publish</button>
                      </div>
                    </div>
                  </>
                )}

                {showPublishSuccessPopup && (
                  <>
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40"></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
                      ✅ Publish successfully!
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        
        {/* Job Applicant Lists */}
        {showApplicants && (
          <div id="section3">
            <h1 className="text-2xl font-bold mb-4">Job Applicants</h1>
            <div>
              <div className='bg-black rounded-2xl p-2 m-2 h-full'>
                <div className='bg-dpink grid grid-cols-12 rounded-t-2xl p-2 font-semibold text-white'> 
                  <h3 className='col-span-1 text-center'>ID</h3>
                  <h3 className='col-span-3'>Name</h3>
                  <h3 className='col-span-2 text-center'>Resume</h3>
                  <h3 className='col-span-6 text-center'>Contact info</h3>
                </div>

                <div className='overflow-y-auto h-[500px]'>
                  {ApplicantList.map((list) => (
                    <div key={list.id} className='grid grid-cols-12 py-1 bg-white overflow-x-hidden'>
                      <p className='col-span-1 text-center'>{list.id}</p>
                      <p className='col-span-3'>{list.name}</p>
                      <p className='col-span-2 text-center'>{list.resume}</p> 
                      <p className='col-span-6 pl-18'>{list.mail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyDashboard
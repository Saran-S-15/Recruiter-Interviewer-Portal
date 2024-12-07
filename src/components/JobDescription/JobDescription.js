import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./JobDescription.css";
import Sidebar from './Sidebar';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Topbar from './Topbar';
import Switch from '@mui/material/Switch';
import { json, useNavigate } from 'react-router-dom';


function JobDescription() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [candidates, setCandidates] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [showJobDetails, setShowJobDetails] = useState(false);

    const [listJobDetails, setListJobDetails] = useState([]);

    const [showSchedule, setShowSchedule] = useState(false);

    const [selectCandidateIndex, setSelectCandidateIndex] = useState(null);

    const [AssignCandidateToInterviewer, setAssignCandidateToInterviewer] = useState(false);

    const [interviewDetails, setInterviewDetails] = useState([])

    const [selectedJobIndex, setSelectedJobIndex] = useState(null);

    const handleJobClick = (index) => {
        setSelectedJobIndex(index);
    };
    const handleResetClick = () => {
        setSelectedJobIndex(null);
    };
    const filteredJobDetails = selectedJobIndex !== null
        ? [listJobDetails[selectedJobIndex]]
        : listJobDetails;


    useEffect(() => {
        const storedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
        setCandidates(storedCandidates);
    }, []);

    useEffect(() => {
        const storedJobDetails = JSON.parse(localStorage.getItem('jobdetails')) || [];
        setListJobDetails(storedJobDetails)
    }, [])

    useEffect(() => {
        const storedInterviewDetails = localStorage.getItem('interviewAssignDetails');
        if (storedInterviewDetails) {
            setInterviewDetails(JSON.parse(storedInterviewDetails));
        } else {
            setInterviewDetails([]);
        }
    }, []);



    const handleAddCandidateClick = () => {
        setShowForm(true);
    }

    const handleBackClick = () => {
        setShowForm(false);
    }

    const openform = () => {
        setShowForm(true)
    }

    const handleJobDetails = () => {
        setShowJobDetails(true)
        setShowSchedule(false)
    }

    const handleCandidatePage = () => {
        setShowJobDetails(false)
        setShowSchedule(false)
    }

    const handleBackShowSchedule = () => {
        setShowSchedule(false)
    }


    const handleJobBackClick = () => {
        setShowJobDetails(false)
    }

    const openSchedule = (index) => {
        setSelectCandidateIndex(index);
        setShowJobDetails(false);
        setShowForm(false);
        setShowSchedule(true);

    }

    const assignInterviewer = () => {
        setAssignCandidateToInterviewer(prevState => !prevState)
    }

    const formik2 = useFormik({
        initialValues: {
            jobcode: "",
            clientprojectname: "",
            jobtitle: "",
            jobtype: "",
            location: "",
            requiredcandidates: "",
            qualification: "",
            experience: "",
            assignto: "",
            date: "",
            jobdescription: "",
            jobresponsiblities: "",
            primaryskills: "",
            secondaryskills: ""
        },
        validate: values => {
            let error = {}

            if (values.jobcode === "") {
                error.jobcode = "Please enter job code"
            }
            if (values.clientprojectname === "") {
                error.clientprojectname = "Please enter client project name"
            }
            if (values.jobtitle === "") {
                error.jobtitle = "Please enter job title"
            }
            if (values.location === "") {
                error.location = "Please enter location"
            }
            if (values.qualification === "") {
                error.qualification = "Please enter qualification"
            }
            if (values.jobdescription === "") {
                error.jobdescription = "Please enter job description"
            }
            if (values.jobresponsiblities === "") {
                error.jobresponsiblities = "Please enter job responsibilities"
            }
            if (values.primaryskills === "") {
                error.primaryskills = "Please enter primary skills"
            }
            if (values.secondaryskills === "") {
                error.secondaryskills = "Please enter secondary skills"
            }

            return error
        },
        onSubmit: values => {
            console.log(values)
            formik2.resetForm()
            setShowJobDetails(false)
            const updatedJobDetails = [...listJobDetails, values]
            setListJobDetails(updatedJobDetails)
            localStorage.setItem('jobdetails', JSON.stringify(updatedJobDetails))
        }
    })

    const formik = useFormik({
        initialValues: {
            sourcingchannel: "",
            candidatename: "",
            contactnumber: "",
            alternatecontactnumber: "",
            emailid: "",
            candidateexperience: "",
            currentlocation: "",
            nativeplace: "",
            preferredworklocation: "",
            martialstatus: "",
            currentctc: "",
            expectedctc: "",
            noticeperiod: "",
            screeningstatus: ""
        },
        validate: values => {
            let error = {}

            if (values.sourcingchannel === "") {
                error.sourcingchannel = "Please enter the sourcing channel"
            }
            if (values.candidatename === "") {
                error.candidatename = "Please enter candidate name"
            }
            if (values.contactnumber === "") {
                error.contactnumber = "Please enter contact number"
            } else if (values.contactnumber.length < 10 || values.contactnumber.length > 10) {
                error.contactnumber = "Invalid Number"
            }
            if (values.alternatecontactnumber === "") {
                error.alternatecontactnumber = "Please enter alternate contact number"
            } else if (values.alternatecontactnumber.length < 10 || values.alternatecontactnumber.length > 10) {
                error.alternatecontactnumber = "Invalid Number"
            }
            if (values.emailid === "") {
                error.emailid = "Please enter email Id"
            } else if (!/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(values.emailid)) {
                error.emailid = "Please enter valid email"
            }
            if (values.candidateexperience === "") {
                error.candidateexperience = "Please enter candidate experience"
            }
            if (values.currentlocation === "") {
                error.currentlocation = "Please enter current location"
            }
            if (values.nativeplace === "") {
                error.nativeplace = "Please enter native place"
            }
            if (values.preferredworklocation === "") {
                error.preferredworklocation = "Please enter preferred work location"
            }
            if (values.currentctc === "") {
                error.currentctc = "Please enter current CTC"
            }
            if (values.expectedctc === "") {
                error.expectedctc = "Please enter expected CTC"
            }
            if (values.noticeperiod === "") {
                error.noticeperiod = "Please enter notice period"
            }

            return error
        },
        onSubmit: values => {
            const updatedCandidates = [...candidates, values]
            setCandidates(updatedCandidates)
            localStorage.setItem('candidates', JSON.stringify(updatedCandidates))
            setShowForm(false);
            formik.resetForm();
        }
    })

    const formik3 = useFormik({
        initialValues: {
            interviewerstatus: "",
            assigninterviewer: "",
            date: "",
            from: "",
            to: "",
            meetinglink: ""
        },
        validate: values => {
            let error = {}

            if (values.meetinglink === "") {
                error.meetinglink = "Please enter meeting link"
            }
            if (values.interviewerstatus === "") {
                error.interviewerstatus = "Please select a status"
            }
            if (values.assigninterviewer === "") {
                error.assigninterviewer = "Please assign a interviewer"
            }
            if (values.date === "") {
                error.date = "Please select a date"
            }
            if (values.from === "") {
                error.from = "Please select start time"
            }
            if (values.to === "") {
                error.to = "Please select a till time"
            }

            return error
        },
        onSubmit: values => {
            const updatedCandidates = [...candidates];
            updatedCandidates[selectCandidateIndex] = {
                ...updatedCandidates[selectCandidateIndex],
                ...values,
            };
            setCandidates(updatedCandidates);
            localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
            const interviewAssignDetails = [...interviewDetails, values]
            setInterviewDetails(interviewAssignDetails);
            formik3.resetForm()
            localStorage.setItem("interviewDetails", JSON.stringify(interviewAssignDetails))
        }
    })

    useEffect(() => {
        console.log(interviewDetails);
    }, [interviewDetails]);

    const selectedCandidate = selectCandidateIndex !== null ? candidates[selectCandidateIndex] : null;


    return (
        <div className='container-fluid ko'>
            <Sidebar jobClick={handleJobDetails} showCandidate={handleCandidatePage} />
            <Topbar />
            <div className='container'>
                {
                    showSchedule && (
                        <div className='row'>
                            <div className='col-lg-10'></div>
                            <div className='col-lg-6 index'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <h5 className='fw-bold mt-4 ms-3'>Candidate Name:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Email ID:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Contact Number:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Current Location:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Native Place:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Martial Status:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Preferred Work Location:</h5>
                                    </div>
                                    <div className='col-lg-6'>
                                        <h5 className='mt-4'>{selectedCandidate.candidatename}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.emailid}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.contactnumber}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.currentlocation}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.nativeplace}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.martialstatus}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.preferredworklocation}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 index'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <h5 className='fw-bold mt-4 ms-3'>Alternate Contact Number:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Sourcing Channel:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Candidate Experience:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Current CTC:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Expected CTC:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Notice Period:</h5>
                                        <h5 className='fw-bold mt-4 ms-3'>Upload Resume:</h5>
                                    </div>
                                    <div className='col-lg-6'>
                                        <h5 className='mt-4'>{selectedCandidate.alternatecontactnumber}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.sourcingchannel}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.candidateexperience}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.currentctc}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.expectedctc}</h5>
                                        <h5 className='mt-4'>{selectedCandidate.noticeperiod}</h5>
                                        <h5 className='mt-4'></h5>
                                    </div>
                                </div>
                            </div>
                            <h3 className='fw-bold ms-5 mt-4'>Interview Details:</h3>
                            <div className='col-lg-6 interview'>
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 mt-4'>Interview Status:</h5>
                                    <div style={{marginLeft:"330px"}} className='interviewdata me-5 mt-4 fs-6'>{selectedCandidate.screeningstatus}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 '>Assigned Interview:</h5>
                                    <div style={{marginLeft:"300px"}} className='interviewdata me-5  fs-5'>{selectedCandidate.assigninterviewer}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3'>Assigned Date:</h5>
                                    <div style={{marginLeft:"340px"}} className='interviewdata me-5  fs-5'>{selectedCandidate.date}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 '>Interview Date:</h5>
                                    <div style={{marginLeft:"340px"}} className='interviewdata me-5  fs-5'>{selectedCandidate.date}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 '>Meeting Link:</h5>
                                    <div style={{marginLeft:"355px"}} className='interviewdata me-5 fs-5'>{selectedCandidate.meetinglink}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 '>Assesment:</h5>
                                    <div style={{marginLeft:"370px"}} className='interviewdata me-5  fs-5'><a href="">xyz.assesment.com</a></div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 '>Interviewer Status:</h5>
                                    <div className='interviewdata me-5  fs-5'>{selectedCandidate.interviewerstatus}</div>
                                </div>
                                <hr />
                                <div className='d-flex'>
                                    <h5 className='fw-bold fs-5 ms-3 mb-4'>Reason</h5>
                                    <div className='interviewdata me-5 mb-4  fs-5'></div>
                                </div>
                            </div>
                            <h3 className='fw-bold ms-5 switch'>Schedule Next Level?
                                <Switch {...label} onClick={assignInterviewer} className='ms-5' />
                            </h3>
                            <div className='col-lg-12'>
                                {
                                    AssignCandidateToInterviewer && (
                                        <form onSubmit={formik3.handleSubmit}>
                                            <div className='row assign'>
                                                <div className='col-lg-6'>
                                                    <select className='form-select mt-4'
                                                        name='interviewerstatus'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.interviewerstatus}
                                                    >
                                                        <option>Interviewer Status</option>
                                                        <option value="level 1">Level 1</option>
                                                        <option value="Final Hr Discussion">Final HR Discussion</option>
                                                    </select>
                                                    {
                                                        formik3.touched.interviewerstatus ? <span style={{ color: "red" }}>{formik3.errors.interviewerstatus}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-6'>
                                                    <select className='form-select mt-4'
                                                        name='assigninterviewer'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.assigninterviewer}>
                                                        <option>Assign Interviewer</option>
                                                        <option value="Interviewer">Interviewers</option>
                                                    </select>
                                                    {
                                                        formik3.touched.assigninterviewer ? <span style={{ color: "red" }}>{formik3.errors.assigninterviewer}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-6'>
                                                    <input type='date'
                                                        name='date'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.date} className='form-control mt-4'></input>
                                                    {
                                                        formik3.touched.date ? <span style={{ color: "red" }}>{formik3.errors.date}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-3 mt-'>
                                                    <input type='time'
                                                        name='from'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.from} className='form-control mt-4' placeholder='Interview From Time'></input>
                                                    {
                                                        formik3.touched.from ? <span style={{ color: "red" }}>{formik3.errors.from}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-3'>
                                                    <input type='time' className='form-control mt-4' placeholder='Interview From Time'
                                                        name='to'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.to}></input>
                                                    {
                                                        formik3.touched.to ? <span style={{ color: "red" }}>{formik3.errors.to}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-12'>
                                                    <input type='text' placeholder='Meeting Link' className='form-control mt-4'
                                                        name='meetinglink'
                                                        onChange={formik3.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik3.values.meetinglink}></input>
                                                    {
                                                        formik3.touched.meetinglink ? <span style={{ color: "red" }}>{formik3.errors.meetinglink}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-2'></div>
                                                <div className='col-lg-2'></div>
                                                <div className='col-lg-2'></div>
                                                <div className='col-lg-2'></div>
                                                <div className='col-lg-2'>
                                                    <button className='form-control mt-4 btn btn-danger mb-4'
                                                        onClick={handleBackShowSchedule}>Cancel</button>
                                                </div>
                                                <div className='col-lg-2'>
                                                    <input type='submit' className='form-control btn btn-primary mb-4 mt-4'></input>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                {
                    !showSchedule && (
                        !showJobDetails ? (<div className='row'>
                            <div className='col-lg-2'>
                                <button onClick={handleJobDetails} className='form-control btn btn-primary mt-3 ms-5'>Add Jobs</button>
                            </div>
                            <div className='col-lg-9'></div>
                            <div className='col-lg-3 box1'>
                                <input type='text'
                                    className='form-control mt-3 text-center'
                                    placeholder='Search Jobs'
                                    onClick={handleResetClick}
                                />
                                <hr />
                                {filteredJobDetails.map((job, index) => (
                                    <div
                                        key={index}
                                        className={`ms-2 me-auto mb-3 list rounded ${selectedJobIndex === index ? 'highlighted' : ''}`} // Conditionally add the "highlighted" class
                                        onClick={() => handleJobClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="fw-bold">{index + 1}. {job.jobtitle}</div>
                                        {job.date}
                                        <hr />
                                    </div>
                                ))}
                            </div>
                            <div className='col-lg-9 box2'>
                                <div className='row mt-4'>
                                    <div className='col-lg-9'>
                                        <h3 className='fw-bold'>Candidate List</h3>
                                    </div>
                                    {!showForm && (
                                        <div className='col-lg-3'>
                                            <button onClick={handleAddCandidateClick} className='form-control btn btn-primary ms-auto'>ADD CANDIDATE</button>
                                        </div>
                                    )}
                                </div>

                                {!showForm ? (
                                    <div className='col-lg-12 mt-3 mb-4'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Experience</th>
                                                    <th>CTC Expected</th>
                                                    <th>Contact Number</th>
                                                    <th>Recruiter</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    candidates.map((candidate, index) => {
                                                        return <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{candidate.candidatename}</td>
                                                            <td>{candidate.candidateexperience}</td>
                                                            <td>{candidate.expectedctc}</td>
                                                            <td>{candidate.contactnumber}</td>
                                                            <td>{candidate.sourcingchannel}</td>
                                                            <td>{candidate.screeningstatus}</td>
                                                            <td onClick={() => { openSchedule(index) }}><VisibilityIcon sx={{ cursor: "pointer" }} />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className='col-lg-12'>
                                        <form onSubmit={formik.handleSubmit} >
                                            <div className='row'>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-4' placeholder='Sourcing Channel'
                                                        name='sourcingchannel'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.sourcingchannel}
                                                    />
                                                    {
                                                        formik.touched.sourcingchannel ? <span style={{ color: "red" }}>{formik.errors.sourcingchannel}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-4' placeholder='Candidate Name*'
                                                        name='candidatename'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.candidatename}
                                                    />
                                                    {
                                                        formik.touched.candidatename ? <span style={{ color: "red" }}>{formik.errors.candidatename}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-4' placeholder='Contact Number'
                                                        name='contactnumber'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.contactnumber}
                                                    />
                                                    {
                                                        formik.touched.contactnumber ? <span style={{ color: "red" }}>{formik.errors.contactnumber}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Alternate Contact Number'
                                                        name='alternatecontactnumber'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.alternatecontactnumber}
                                                    />
                                                    {
                                                        formik.touched.alternatecontactnumber ? <span style={{ color: "red" }}>{formik.errors.alternatecontactnumber}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Email ID'
                                                        name='emailid'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.emailid}
                                                    />
                                                    {
                                                        formik.touched.emailid ? <span style={{ color: "red" }}>{formik.errors.emailid}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Candidate Experience'
                                                        name='candidateexperience'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.candidateexperience}
                                                    />
                                                    {
                                                        formik.touched.candidateexperience ? <span style={{ color: "red" }}>{formik.errors.candidateexperience}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Current Location'
                                                        name='currentlocation'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.currentlocation}
                                                    />
                                                    {
                                                        formik.touched.currentlocation ? <span style={{ color: "red" }}>{formik.errors.currentlocation}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Native Place'
                                                        name='nativeplace'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.nativeplace}
                                                    />
                                                    {
                                                        formik.touched.nativeplace ? <span style={{ color: "red" }}>{formik.errors.nativeplace}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Preferred Work Location'
                                                        name='preferredworklocation'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.preferredworklocation}
                                                    />
                                                    {
                                                        formik.touched.preferredworklocation ? <span style={{ color: "red" }}>{formik.errors.preferredworklocation}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <select className='form-select mb-2 mt-3'
                                                        name='martialstatus'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.martialstatus}>
                                                        <option>Martial Status</option>
                                                        <option value="Married">Married</option>
                                                        <option value="Unmarried">Unmarried</option>
                                                    </select>

                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Current CTC'
                                                        name='currentctc'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.currentctc}
                                                    />
                                                    {
                                                        formik.touched.currentctc ? <span style={{ color: "red" }}>{formik.errors.currentctc}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Expected CTC'
                                                        name='expectedctc'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.expectedctc}
                                                    />
                                                    {
                                                        formik.touched.expectedctc ? <span style={{ color: "red" }}>{formik.errors.expectedctc}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-4'>
                                                    <input type='text' className='form-control mb-2 mt-3' placeholder='Notice Period (in days)'
                                                        name='noticeperiod'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.noticeperiod}
                                                    />
                                                    {
                                                        formik.touched.noticeperiod ? <span style={{ color: "red" }}>{formik.errors.noticeperiod}</span> : null
                                                    }
                                                </div>
                                                <div className='col-lg-8'>
                                                    <select className='form-select mb-2 mt-3'
                                                        name='screeningstatus'
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.screeningstatus}>
                                                        <option>Screening Status</option>
                                                        <option value="In Progress">In Progress</option>
                                                    </select>
                                                </div>
                                                <div className='col-lg-6'></div>
                                                <div className='col-lg-3'><button onClick={handleBackClick} className='form-control border border-dark btn-sm mt-4'>Back</button></div>
                                                <div className='col-lg-3'>
                                                    <input type='submit' disabled={!formik.isValid} className='form-control mb-2 btn btn-primary mb-4 mt-4' />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                        ) : (<div className='container ms-3 pb-5'>
                            <form onSubmit={formik2.handleSubmit} >
                                <h3 className='text-center mt-3 fw-bold'>Job Requirements</h3>
                                <div className='row je mt-4'>
                                    <div className='col-lg-4'>
                                        <input type='text' placeholder='Job Code' className='form-control'
                                            name='jobcode'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.jobcode}
                                        ></input>
                                        {
                                            formik2.touched.jobcode ? <span style={{ color: "red" }}>{formik2.errors.jobcode}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-8'>
                                        <input type='text' placeholder='Client Project Name' className='form-control'
                                            name='clientprojectname'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.clientprojectname}
                                        ></input>
                                        {
                                            formik2.touched.clientprojectname ? <span style={{ color: "red" }}>{formik2.errors.clientprojectname}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-4'>
                                        <input type='text' className='form-control' placeholder='Job Title'
                                            name='jobtitle'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.jobtitle}
                                        ></input>
                                        {
                                            formik2.touched.jobtitle ? <span style={{ color: "red" }}>{formik2.errors.jobtitle}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-4'>
                                        <select className='form-select'
                                            name='jobtype'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.jobtype}>
                                            <option>Job Type</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Consultant">Consultant</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <input type='text' className='form-control' placeholder='Location'
                                            name='location'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.location}
                                        ></input>
                                        {
                                            formik2.touched.location ? <span style={{ color: "red" }}>{formik2.errors.location}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-4'>
                                        <select className='form-select'
                                            name='requiredcandidates'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.requiredcandidates}
                                        >
                                            <option>Required Candidates</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <input type='text' className='form-control' placeholder='Qualification'
                                            name='qualification'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.qualification}
                                        ></input>
                                        {
                                            formik2.touched.qualification ? <span style={{ color: "red" }}>{formik2.errors.qualification}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-4'>
                                        <select className='form-select'
                                            name='experience'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.experience}>
                                            <option>Experience</option>
                                            <option value="Intern">Intern</option>
                                            <option value="Work Experience">Work Experience</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-12'>
                                        <textarea className='form-control' placeholder='Enter your Job Description' rows={3}
                                            name='jobdescription'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.jobdescription}
                                        ></textarea>
                                        {
                                            formik2.touched.jobdescription ? <span style={{ color: "red" }}>{formik2.errors.jobdescription}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-12'>
                                        <textarea className='form-control' placeholder='Enter your Job Responsibilities' rows={3}
                                            name='jobresponsiblities'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.jobresponsiblities}
                                        ></textarea>
                                        {
                                            formik2.touched.jobresponsiblities ? <span style={{ color: "red" }}>{formik2.errors.jobresponsiblities}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-12'>
                                        <textarea className='form-control' placeholder='Enter your Primary Skills' rows={3}
                                            name='primaryskills'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.primaryskills}
                                        ></textarea>
                                        {
                                            formik2.touched.primaryskills ? <span style={{ color: "red" }}>{formik2.errors.primaryskills}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-12'>
                                        <textarea className='form-control' placeholder='Enter your Secondary Skills' rows={3}
                                            name='secondaryskills'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.secondaryskills}
                                        ></textarea>
                                        {
                                            formik2.touched.secondaryskills ? <span style={{ color: "red" }}>{formik2.errors.secondaryskills}</span> : null
                                        }
                                    </div>
                                    <div className='col-lg-8'>
                                        <select className='form-select'
                                            name='assignto'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.assignto}>
                                            <option>Assign To</option>
                                            <option value="Interviewer">Interviewer</option>
                                        </select>
                                    </div>
                                    <div className='col-lg-4'>
                                        <input type='date' className='form-control'
                                            name='date'
                                            onChange={formik2.handleChange}
                                            onBlur={formik2.handleBlur}
                                            value={formik2.values.date}></input>
                                    </div>
                                    <div className='col-lg-3'><button onClick={handleJobBackClick} className='form-control border border-black ms-2'>Back</button>
                                    </div>
                                    <div className='col-lg-6'></div>
                                    <div className='col-lg-3'>
                                        <input disabled={!formik2.isValid} type='submit' className='form-control btn btn-primary'></input>
                                    </div>
                                </div>
                            </form>
                        </div>)
                    )
                }

            </div>
        </div>
    );
}

export default JobDescription;

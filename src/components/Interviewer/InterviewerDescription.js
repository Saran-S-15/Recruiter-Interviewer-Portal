import React, { useEffect, useState } from 'react';
import Sidebar2 from "./Sidebar2";
import Topbar2 from './Topbar2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import DiscreteSlider from './DiscreteSlider';
import RowRadioButtonsGroup from './RowRadioButtonsGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function InterviewerDescription() {
  const [candidates, setCandidates] = useState([]);
  const [listJobDetails, setListJobDetails] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState([]);

  const handleForm = (candidate) => {
    setSelectedCandidate(candidate);
    formik.resetForm();
    setShowForm(true);
  };

  const handlebackclick = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    setCandidates(storedCandidates);
  }, []);

  useEffect(() => {
    const storedJobDetails = JSON.parse(localStorage.getItem('jobdetails')) || [];
    setListJobDetails(storedJobDetails);
  }, []);

  useEffect(() => {
    const merged = candidates.map(candidate => {
      const jobDetail = listJobDetails.find(job => job.clientprojectname === candidate.candidatename) || {};
      return { ...candidate, ...jobDetail };
    });
    setMergedData(merged);
  }, [candidates, listJobDetails]);


  useEffect(() => {
    const storedInterviewDetails = localStorage.getItem('interviewAssignDetails');
    if (storedInterviewDetails) {
        setInterviewDetails(JSON.parse(storedInterviewDetails));
    } else {
        setInterviewDetails([]);
    }
}, []);


  const formik = useFormik({
    initialValues: {
      r1: "",
      primaryskills: "",
      r2: "",
      secondaryskills: "",
      r3: "",
      jobknowledge: "",
      r4: "",
      candidatebehaviour: "",
      r5: "",
      communication: "",
      r6: "",
      fluency: "",
      r7: "",
      listeningskills: "",
      r8: "",
      presentationskills: "",
      overallfeedback: "",
      r9: "",
      finaldecesion: ""
    },
    onSubmit: values => {
      const updatedCandidates = candidates.map(candidate => {
        if (candidate.candidatename === selectedCandidate.candidatename) {
          const interviewStatus = candidate.interviewerstatus || 'Pending';
          
          const finalScreeningStatus = `${interviewStatus} - ${values.finaldecesion}`;
          
          return {
            ...candidate,
            status: finalScreeningStatus, 
            screeningstatus: finalScreeningStatus 
          };
        }
        return candidate;
      });

      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      setCandidates(updatedCandidates);
      setShowForm(false);
    }
  });

  return (
    <div className='App'>
      <Sidebar2 />
      <Topbar2 />
      {!showForm ? (
        <div className='row schedule p-2'>
          <div className='col-lg-12'><h1>My Schedules List</h1></div>
          <div className='col-lg-12'>
            <table className='mb-3'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Candidate ID</th>
                  <th>Candidate Name</th>
                  <th>Assigned By</th>
                  <th>Interview Date</th>
                  <th>Interview From time</th>
                  <th>Interview to time</th>
                  <th>Job Title</th>
                  <th>Current Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.jobcode}</td>
                    <td>{item.candidatename}</td>
                    <td>{item.sourcingchannel}</td>
                    <td>{item.date}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.jobtitle}</td>
                    <td>{item.interviewerstatus}</td>
                    <td>{item.status || "Pending"}</td>
                    <td onClick={() => handleForm(item)}>
                      <VisibilityIcon sx={{ cursor: "pointer" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='row ms-5'>
          <form onSubmit={formik.handleSubmit}>
            <div className='col-lg-12'>
              <div className='row ms-3 mt-4'>
                <div className='col-lg-4 fs-4 border p-2'>Category</div>
                <div className='col-lg-4 fs-4 border p-2'>Rating(0-5)</div>
                <div className='col-lg-4 fs-4 border p-2'>Comments</div>
                <div className='col-lg-4 fs-5'>Primary Skills</div>
                <div className='col-lg-4'>
                  <DiscreteSlider
                    name="r1"
                    onChange={formik.handleChange}
                    value={formik.values.r1} />
                </div>
                <div className='col-lg-4 mt-2 mb-2 '>
                  <TextField
                    fullWidth
                    required
                    label="Primary Skills"
                    id="Primary Skills"
                    name="primaryskills"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.primaryskills} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Secondary Skills</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r2"
                    onChange={formik.handleChange}
                    value={formik.values.r2} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Secondary Skills"
                    id="Secondary Skills"
                    name="secondaryskills"
                    onChange={formik.handleChange}
                    value={formik.values.secondaryskills} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Job Knowledge/Process</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r3"
                    onChange={formik.handleChange}
                    value={formik.values.r3} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Job Knowledge"
                    id="Job Knowledge"
                    name="jobknowledge"
                    onChange={formik.handleChange}
                    value={formik.values.jobknowledge} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Candidate Behaviour</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r4"
                    onChange={formik.handleChange}
                    value={formik.values.r4} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Candidate Behaviour"
                    id="Candidate Behaviour"
                    name="candidatebehaviour"
                    onChange={formik.handleChange}
                    value={formik.values.candidatebehaviour} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Clarity in Communication</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r5"
                    onChange={formik.handleChange}
                    value={formik.values.r5} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Communication"
                    id="Communication"
                    name="communication"
                    onChange={formik.handleChange}
                    value={formik.values.communication} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Fluency in English</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r6"
                    onChange={formik.handleChange}
                    value={formik.values.r6} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Fluency"
                    id="Fluency"
                    name="fluency"
                    onChange={formik.handleChange}
                    value={formik.values.fluency} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Listening Skills</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r7"
                    onChange={formik.handleChange}
                    value={formik.values.r7} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Listening Skills"
                    id="Listening Skills"
                    name="listeningskills"
                    onChange={formik.handleChange}
                    value={formik.values.listeningskills} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Presentation Skills</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r8"
                    onChange={formik.handleChange}
                    value={formik.values.r8} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Presentation Skills"
                    id="Presentation Skills"
                    name="presentationskills"
                    onChange={formik.handleChange}
                    value={formik.values.presentationskills} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Overall Feedback</div>
                <div className='col-lg-4 mt-2'>
                  <DiscreteSlider
                    name="r9"
                    onChange={formik.handleChange}
                    value={formik.values.r9} />
                </div>
                <div className='col-lg-4  mb-2'>
                  <TextField
                    fullWidth
                    required
                    label="Overall Feedback"
                    id="Overall Feedback"
                    name="overallfeedback"
                    onChange={formik.handleChange}
                    value={formik.values.overallfeedback} />
                </div>
                <hr />

                <div className='col-lg-4 fs-5'>Final Decision</div>
                <div className='col-lg-8'>
                  <RowRadioButtonsGroup
                    name="finaldecesion"
                    onChange={formik.handleChange}
                    value={formik.values.finaldecesion} />
                </div>
              </div>
            </div>
            <div className='row mb-5'>
              <div className='col-lg-2 ms-auto mt-2'><button onClick={handlebackclick} className='form-control border border-dark'>Back</button></div>
              <div className='col-lg-2  me-4 p-2'>
                <button type='submit' className='btn btn-primary ms-2 form-control'>Save</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default InterviewerDescription;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import JobDescription from './components/JobDescription/JobDescription';
import Portal from './components/Portal/Portal';
import InterviewerDescription from './components/Interviewer/InterviewerDescription';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/portal' element={<Portal />}>
          <Route path='jobDesc' element={<JobDescription />} />
          <Route path='interviewer' element={<InterviewerDescription/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

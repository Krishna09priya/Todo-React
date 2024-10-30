import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject,resetMsg } from './redux/projectsRedux';
import { Link } from 'react-router-dom';
import Notifications from '../utils/notifications';
import Navbar from './Navbar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { projects, isLoading,projectsSuccessMessage } = useSelector((states)=> states?.projectsReducer);
  const [projectTitle, setProjectTitle] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  },[]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (projectTitle) {
      dispatch(createProject({ title: projectTitle }));
      setProjectTitle('');
    }
  };

  useEffect(()=>{
    if(projectsSuccessMessage){
      Notifications(projectsSuccessMessage,'success')
      dispatch(fetchProjects())
      dispatch(resetMsg())}
  },[projectsSuccessMessage])

  return (
   <>
  <Navbar />
  <div className="container mt-5 homePage">
    <div className="text-center mb-5">
      <h1 className="display-4">My Projects</h1>
    </div>

    <div className="mb-4">
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control me-2"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="New Project Title"
        />
        <button type="submit" className="btn btn-primary" onClick={handleCreateProject}>Create Project</button>
      </div>
    </div>

    {isLoading ? (
      <p className="text-center">Loading projects...</p>
    ) : (
      <div className="row">
        {projects?.data?.map((project) => (
          <div key={project._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center mb-3">{project.title}</h5>
                <Link to={`/projects/${project._id}`} className="btn btn-outline-primary mt-auto">
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</>

  );
};

export default HomePage;

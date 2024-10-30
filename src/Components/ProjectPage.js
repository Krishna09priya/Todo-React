import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject, updateProjectTitle, addTodo, updateTodo,StatusTodo, deleteTodo,resetMsg } from './redux/projectRedux';
import { useParams } from 'react-router-dom';
import Notifications from '../utils/notifications';
import Navbar from './Navbar';

const ProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { project, isLoading,todoSuccessMessage,todoUpdateSuccessMessage,todoDeleteSuccessMessage,projectUpdateSuccessMessage,todoStatusSuccessMessage } = useSelector((states)=> states?.projectReducer);
  const [todoDescription, setTodoDescription] = useState('');
  const [editableTitle, setEditableTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTodo, setEditableTodo] = useState('');
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    dispatch(fetchProject({id:projectId}));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project) {
      setEditableTitle(project.title);
    }
  }, [project]);

  const handleAddTodo = () => {
    dispatch(addTodo({ id:projectId, description: todoDescription }));
    setTodoDescription('');
    };

  useEffect(()=>{
    if(todoSuccessMessage){
      dispatch(fetchProject({id:projectId}))
      Notifications(todoSuccessMessage,'success')
      dispatch(resetMsg())}
  },[todoSuccessMessage,dispatch])

  const handleUpdateStatusTodo = (todoId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    dispatch(StatusTodo({ projectId, todoId, status: newStatus }));
  };

  useEffect(() => {
    if (todoStatusSuccessMessage) {
      Notifications(todoStatusSuccessMessage, 'success');
      dispatch(fetchProject({ id: projectId }));
      dispatch(resetMsg());
    }
  }, [dispatch, todoStatusSuccessMessage]);

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo({ projectId, todoId }));
  };
  useEffect(()=>{
    if(todoDeleteSuccessMessage){
      Notifications(todoDeleteSuccessMessage,'success')
      dispatch(fetchProject({id:projectId}))}
      dispatch(resetMsg())
    },[dispatch,todoDeleteSuccessMessage]
  );

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    dispatch(updateProjectTitle({ id:projectId, title: editableTitle }));
    setIsEditingTitle(false);
  };

  useEffect(()=>{
    if(projectUpdateSuccessMessage){
      Notifications(projectUpdateSuccessMessage,'success')
      dispatch(fetchProject({id:projectId}))
      dispatch(resetMsg())}
    },[dispatch,projectUpdateSuccessMessage]
  );

  const handleTodoEdit = (todo) => {
    setEditingTodoId(todo._id); 
    setIsEditingTodo(true);
  };

  const handleUpdateTodo = (todoId) => {
    dispatch(updateTodo({ projectId, todoId, description:editableTodo }));
    setEditingTodoId(null); 
    setIsEditingTodo(false);
  };
  useEffect(()=>{
    if(todoUpdateSuccessMessage){
      Notifications(todoUpdateSuccessMessage,'success')
      dispatch(fetchProject({id:projectId}))}
      dispatch(resetMsg())
    },[dispatch,todoUpdateSuccessMessage]
  );

  // Function to generate the markdown content
  const generateMarkdownContent = () => {
    const completedTodos = project.data.todos.filter(todo => todo.status === "completed").length;
    const totalTodos = project.data.todos.length;

    let content = `${project.data.title}\n\n`;
    content += `Summary: ${completedTodos}/${totalTodos} todos completed\n\n`;

    const pendingTodos = project.data.todos.filter(todo => todo.status === "pending");
    const completedTodosList = project.data.todos.filter(todo => todo.status === "completed");

    content += "Pending\n";
    pendingTodos.forEach(todo => {
      content += `- [ ] ${todo.description}\n`; 
    });

    content += "\nCompleted\n";
    completedTodosList.forEach(todo => {
      content += `- [x] ${todo.description}\n`;
    });

    return content;
  };

  const handleExportSummary = async () => {
    const markdownContent = generateMarkdownContent();

    const token = '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'; 
    const gistData = {
      description: `Summary of Project: ${project?.data?.title}`,
      public: false,
      files: {
        'project-summary.md': {
          content: markdownContent,
        },
      },
    };

    try {
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gistData),
      });

      if (response.ok) {
        const result = await response.json();
        Notifications(`Gist created successfully! URL: ${result.html_url}`, 'success');
      } else {
        Notifications('Failed to create gist', 'error');
      }
    } catch (error) {
      console.error('Error creating gist:', error);
      Notifications('An error occurred while creating the gist', 'error');
    }
  };

  const handleDownloadSummary = () => {
    const markdownContent = generateMarkdownContent();
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.data.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
  <Navbar />
  <div className="container mt-4 projectPage">
    <div className="mb-4">
      {isEditingTitle ? (
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleTitleSave}>Save</button>
        </div>
      ) : (
        <h1 className="display-4" onClick={handleTitleEdit} style={{ cursor: 'pointer' }}>
          {project?.data?.title}
        </h1>
      )}
    </div>

    <p className="text-muted mb-4">
      <strong>Summary:</strong> {project?.data?.todos?.filter(todo => todo.status === "completed").length || 0} / {project?.data?.todos.length || 0} completed
    </p>

    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        placeholder="New Todo"
      />
      <button className="btn btn-success" onClick={handleAddTodo}>Add Todo</button>
    </div>


    {isLoading ? (
      <p>Loading project...</p>
    ) : (
      <ul className="list-group">
        {project?.data?.todos.map((todo) => (
          <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTodoId === todo._id ? (
              <div className="d-flex w-100">
                <input
                  type="text"
                  className="form-control me-2"
                  value={editableTodo}
                  onChange={(e) => setEditableTodo(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => handleUpdateTodo(todo._id)}>Save</button>
              </div>
            ) : (
              <div className="d-flex w-100 justify-content-between">
                <span
                  onClick={() => handleTodoEdit(todo)}
                  style={{ cursor: 'pointer', textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}
                >
                  {todo.description}
                </span>
                <div>
                  <button
                    className={`btn btn-sm ${todo.status === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'} me-2`}
                    onClick={() => handleUpdateStatusTodo(todo._id, todo.status)}
                  >
                    {todo.status === 'completed' ? 'Completed' : 'Pending'}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    )}

    <div className="mt-4">
      <button className="btn btn-info me-2" onClick={handleExportSummary}>Export Summary as Gist</button>
      <button className="btn btn-secondary" onClick={handleDownloadSummary}>Download Summary Locally</button>
    </div>
  </div>
</>

  );
};

export default ProjectPage;


import React from 'react';
import './ProjectCard.css';
import { IProject } from '../../../Interfaces';

interface ProjectCardProps {
  Project: IProject;
  taskCount: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ Project, taskCount }) => {
  return (
    <div className=' card'>
      <div className='cardHeader'>
        <h2 className='cardTitle'>{Project.title}</h2>
        <span className='badge'>
          {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
        </span >
      </div >
      <div className='cardContent'>
        <p className='cardDescription'>{Project.description}</p>
      </div >
    </div >
  );
};



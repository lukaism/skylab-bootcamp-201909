import React from 'react'
import './index.sass'
import TaskList from '../zzzTaskList'
import TaskForm from '../zzzTaskForm'

export default function ({ user, candidates, onLogout, onAproveCandidate, onRejectCandidate }) {
    return <section className="view board">
        <h1 className="board__title">Task Board</h1>
        <h2 className="board__user">{user}</h2>
        <a href="" className="board__favs">Favorites</a>
        <form className="board__logout" onSubmit={event => { event.preventDefault(); onLogout() }}><button>Logout</button></form>
        <TaskForm onSubmit={onNewTask} />
        <TaskList tasks={tasks} onChangeTaskStatus={onChangeTaskStatus} />
    </section>
}
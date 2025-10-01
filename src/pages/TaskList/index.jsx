/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import types from "./TaskList.module.scss";
import { useSelector, useDispatch } from "@/libs/react-redux";
import TaskItem from "@/components/TaskItem";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

function TaskList() {
    const [taskList, setTaskList] = useState(useSelector((state) => state.tasks));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currenTask, setCurrenTask] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData("http://localhost:3000/data");
    }, [taskList])

    async function fetchData(url) {
        try {
            const resquest = await fetch(url, {
                method: "GET",
                "Content-Type": "application/json"
            })

            if (!resquest.ok) {
                throw new Error(`HTTP error: ${resquest.status}`)
            }

            const response = await resquest.json();
            setTaskList(response);
            dispatch({
                type: "SET_TASKS",
                payload: response
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    function handleShowDelete(task) {
        setIsModalOpen(true);
        setCurrenTask(task);
    }
    function handleCloseDelete() {
        setIsModalOpen(false);
        setCurrenTask(null);
    }

    function handleDeleteTask() {
        if (currenTask) {
            try {
                fetch(`http://localhost:3000/data/${currenTask.id}`, {
                    method: "DELETE",
                    "Content-Type": "application/json",
                    body: JSON.stringify(currenTask)
                })

                fetchData("http://localhost:3000/data")
                dispatch({
                    type: "DELETE_TASK",
                    payload: currenTask
                })
                handleCloseDelete();
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    return (
        <div className={types.wrapper}>
            <div className={types.header}>
                <h1 className={types.title}>Taks List</h1>
                <NavLink to="/new-task">
                    <Button children={
                        <span>New Task</span>
                    } rounded sm primary />
                </NavLink>
            </div>
            <ul className={types.tasklist}>
                {taskList.map(task => {
                    return <TaskItem task={task} key={task.id} handleShowDelete={() => handleShowDelete(task)} />
                })}
            </ul>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseDelete}
                overlayClassName="custom-overlay"
                className="custom-modal"
                bodyOpenClassName="modal-open"
                htmlOpenClassName="modal-open"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <h2 className={types["modal-title"]}>Modal Content</h2>
                <p className={types["modal-content"]}>Confirm delete?</p>
                <div className={types["modal-btns"]}>
                    <Button onClick={handleDeleteTask} danger sm>Yes</Button>
                    <Button onClick={handleCloseDelete} sm>Cancel</Button>
                </div>
            </Modal>
        </div>
    )
}

export default TaskList;
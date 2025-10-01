import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import types from "./EditTask.module.scss"
import { useDispatch, useSelector } from "@/libs/react-redux";
import { escapeHtml } from "@/pages/helper";

function EditTask() {
    const param = useParams().id;
    const [taskList, setTaskList] = useState(useSelector(state => state.tasks) || [])
    const [task, setTask] = useState(taskList.find(task => task.id === param) || null)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
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
                setTask(taskList.find(task => task.id === param))
                dispatch({
                    type: "SET_TASKS",
                    payload: response
                });
            } catch (error) {
                throw new Error(error)
            }
        }

        fetchData("http://localhost:3000/data");
    }, [])

    function handleTaskName(e) {
        setTask({ ...task, title: escapeHtml(e.target.value) })
    }

    function handleTaskComplete(e) {
        setTask({ ...task, isCompleted: e.target.checked })
    }

    async function handleClickSubmit() {
        if (!task.title.trim()) {
            alert("Please enter Task Title!");
        } else {
            dispatch({
                type: "UPDATE_TASK",
                payload: task
            })

            const request = await fetch(`http://localhost:3000/data/${task.id}`, {
                method: "PATCH",
                "Content-Type": "application.json",
                body: JSON.stringify(task)
            })

            if (!request.ok) {
                throw new Error(`HTTP fail: ${request.status}`)
            }

            const response = request.json();
            setTask(response);
            navigate("/");
        }
    }

    return (
        <div className={types.wrapper}>
            <TaskForm
                title="Edit Task"
                formBody={(
                    <>
                        <div className={types["form-group"]}>
                            <label htmlFor="task-name">Task Name:</label>
                            <input
                                type="text"
                                id="task-name"
                                onChange={(e) => handleTaskName(e)}
                                value={task ? task.title : ""}
                            />
                        </div>
                        <div className={types["form-group"]}>
                            <label htmlFor="task-complete">Completed:</label>
                            <input
                                type="checkbox"
                                id="task-complete"
                                onChange={(e) => handleTaskComplete(e)}
                                checked={task ? true : false}
                            />
                        </div>
                    </>
                )}
                formFooter={(
                    <div className={types["form-btns-control"]}>
                        <Button
                            type="submit"
                            primary
                            sm
                        >
                            Edit
                        </Button>
                        <NavLink to="/">
                            <Button type="submit" sm>
                                Cancel
                            </Button>
                        </NavLink>
                    </div>
                )}
                onSubmit={handleClickSubmit}
            />
        </div>
    )
}

export default EditTask;
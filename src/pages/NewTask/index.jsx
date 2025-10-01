import { NavLink, useNavigate } from "react-router-dom";
import { memo, useCallback, useState } from "react";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import types from "./NewTask.module.scss"
import { useDispatch } from "@/libs/react-redux";
import { escapeHtml } from "@/pages/helper";

const NewTask = memo(() => {
    const [task, setTask] = useState({ title: "", isCompleted: false })
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleTaskName = useCallback((e) => {
        setTask({ ...task, title: escapeHtml(e.target.value) })
    }, [task])

    const handleTaskComplete = useCallback((e) => {
        setTask({ ...task, isCompleted: e.target.checked })
    }, [task])

    const handleClickSubmit = useCallback(async () => {
        if (!task.title.trim()) {
            alert("Please enter Task Title!");
        } else {
            dispatch({
                type: "ADD_TASK",
                payload: task
            })

            const request = await fetch("http://localhost:3000/data", {
                method: "POST",
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
    }, [dispatch, navigate, task])


    return (
        <div className={types.wrapper}>
            <TaskForm
                title="New Task"
                formBody={(
                    <>
                        <div className={types["form-group"]}>
                            <label htmlFor="task-name">Task Name:</label>
                            <input
                                type="text"
                                id="task-name"
                                onChange={(e) => handleTaskName(e)}
                                value={task.title ? task.title : ""}
                            />
                        </div>
                        <div className={types["form-group"]}>
                            <label htmlFor="task-complete">Completed:</label>
                            <input
                                type="checkbox"
                                id="task-complete"
                                onChange={(e) => handleTaskComplete(e)}
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
                            Add
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
})

export default NewTask;
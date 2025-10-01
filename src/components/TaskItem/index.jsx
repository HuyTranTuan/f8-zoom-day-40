import { NavLink } from "react-router-dom";
import Button from "../Button";
import types from "./TaskItem.module.scss";

function TaskItem({ task, handleShowDelete }) {
    return (
        <li className={types.wrapper} >
            <div className={`${types.title} ${task.isCompleted ? types.incompleted : types.completed}`}>{task.title}</div>
            <div className={types.function}>
                <NavLink to={`/${task.id}/edit`}>
                    <Button children={
                        <span>EDIT</span>
                    } rounded sm primary />
                </NavLink>
                <Button children={
                    <span>DELETE</span>
                } rounded sm danger onClick={handleShowDelete} />
            </div>
        </li>
    )
}

export default TaskItem;
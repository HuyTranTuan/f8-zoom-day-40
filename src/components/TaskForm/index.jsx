import types from "./TaskForm.module.scss";

function TaskForm({ title, formBody, formFooter, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit()
    }
    return (
        <form className={types.wrapper} onSubmit={handleSubmit}>
            <div className={types.header}>
                <h1 className={types.title}>{title}</h1>
            </div>
            <div className={types.body}>
                {formBody}
            </div>
            <div className={types.footer}>
                {formFooter}
            </div>
        </form>
    )
}

export default TaskForm;
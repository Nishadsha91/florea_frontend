function TaskCard({ task, onEdit, onDelete }) {
    const handleDelete = () => onDelete(task.id);
    const handleEdit = () => onEdit(task);

    return (
        <div 
            className={`rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-slate-900 ${
                task.completed 
                    ? "border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-700" 
                    : "border-l-4 border-l-amber-500 border-slate-200 dark:border-slate-700"
            }`}
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                
                {/* Descriptive Core Content info */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                            {task.title}
                        </h2>
                        
                        {/* High-visibility colored badges */}
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border ${
                                task.completed
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${task.completed ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                            {task.completed ? "Completed" : "Pending"}
                        </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {task.description || "No customized details left for this item."}
                    </p>

                    {task.due_date && (
                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <span>📅 Due:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{task.due_date}</span>
                        </div>
                    )}
                </div>

                {/* Crisp, Explicit Actions row */}
                <div className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800 sm:border-0 sm:pt-0">
                    <button
                        onClick={handleEdit}
                        className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors border border-indigo-100"
                    >
                        Edit Task
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-lg transition-colors border border-rose-100"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TaskCard;

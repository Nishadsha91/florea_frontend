import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function TaskForm({ onSubmit, editTask, setEditTask }) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        completed: false,
    });

    useEffect(() => {
        if (editTask) {
            setFormData({
                title: editTask.title,
                description: editTask.description || "",
                due_date: editTask.due_date || "",
                completed: editTask.completed,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                due_date: "",
                completed: false,
            });
        }
    }, [editTask]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("Task title is required.");
            return;
        }

        setLoading(true);
        try {
            const success = await onSubmit(formData);
            if (success) {
                setFormData({
                    title: "",
                    description: "",
                    due_date: "",
                    completed: false,
                });
                setEditTask(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditTask(null);
        setFormData({
            title: "",
            description: "",
            due_date: "",
            completed: false,
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Task Title Input */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Task Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="What needs to be done?"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-950"
                    />
                </div>

                {/* Task Description Textarea */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Description
                    </label>
                    <textarea
                        rows="3"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add some context or specific details..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-950"
                    />
                </div>

                {/* Date & Completion Checkbox Grid Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:bg-slate-800 dark:focus:ring-indigo-950"
                        />
                    </div>

                    {/* Styled Interactive Checkbox Card */}
                    <label className="flex h-[46px] cursor-pointer select-none items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
                        <input
                            type="checkbox"
                            name="completed"
                            checked={formData.completed}
                            onChange={handleChange}
                            className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                        />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Mark as Completed
                        </span>
                    </label>
                </div>

                {/* Form CTA Action Bar */}
                <div className="flex items-center gap-2 pt-2 justify-end">
                    {editTask && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                        >
                            Cancel Changes
                        </button>
                    )}
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-xs font-bold text-white px-5 py-2.5 rounded-lg shadow-sm transition-all shadow-indigo-100 ${
                            loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Saving...
                            </span>
                        ) : editTask ? (
                            "Save Changes"
                        ) : (
                            "Create Task"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;

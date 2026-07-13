import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        fetchTasks(filter);
    }, [filter]);

    const fetchTasks = async (status = "all") => {
        setLoading(true);
        try {
            let url = "tasks/";
            if (status !== "all") {
                url += `?status=${status}`;
            }
            const response = await api.get(url);
            setTasks(response.data.data);
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login", { replace: true });
                return;
            }
            toast.error("Failed to fetch tasks.");
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            await api.post("tasks/", taskData);
            await fetchTasks(filter);
            return true;
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login", { replace: true });
                return false;
            }
            toast.error("Failed to create task.");
            return false;
        }
    };

    const updateTask = async (taskData) => {
        try {
            await api.patch(`tasks/${editTask.id}/`, taskData);
            await fetchTasks(filter);
            setEditTask(null);
            return true;
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login", { replace: true });
                return false;
            }
            toast.error("Failed to update task.");
            return false;
        }
    };

    const deleteTask = async (id) => {
        const confirmDelete = window.confirm("Delete this task?");
        if (!confirmDelete) return;

        try {
            await api.delete(`tasks/${id}/`);
            await fetchTasks(filter);
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login", { replace: true });
                return;
            }
            toast.error("Failed to delete task.");
        }
    };

    const handleSubmit = async (taskData) => {
        if (editTask) {
            return await updateTask(taskData);
        }
        return await addTask(taskData);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-zinc-200 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-slate-700">
            <Navbar onLogout={handleLogout} />

            <main className="max-w-4xl mx-auto py-12 px-6">
                {/* Header Section */}
                {/* Task Form Container */}
                <div className="mb-10 rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <TaskForm
                        onSubmit={handleSubmit}
                        editTask={editTask}
                        setEditTask={setEditTask}
                    />
                </div>

                                <div className="mb-10 pb-6 border-b border-zinc-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">Available Tasks</h1>
                    </div>

                    {/* Minimalist Filter Pills */}
                    <div className="flex self-start rounded-lg bg-zinc-200/60 p-1 dark:bg-slate-800 sm:self-auto">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                                filter === "all"
                                    ? "bg-white text-zinc-950 shadow-sm dark:bg-slate-700 dark:text-white"
                                    : "text-zinc-600 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                                filter === "completed"
                                    ? "bg-white text-zinc-950 shadow-sm dark:bg-slate-700 dark:text-white"
                                    : "text-zinc-600 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                                filter === "pending"
                                    ? "bg-white text-zinc-950 shadow-sm dark:bg-slate-700 dark:text-white"
                                    : "text-zinc-600 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
                            }`}
                        >
                            Pending
                        </button>
                    </div>
                </div>
                
                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                        <span className="mt-3 text-xs font-medium text-zinc-400 dark:text-slate-400">Loading items...</span>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-zinc-200 bg-white/50 p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white">No entries recorded</h3>
                        <p className="mt-1 text-xs text-zinc-400 dark:text-slate-400">There are no tasks matching this filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={setEditTask}
                                onDelete={deleteTask}
                            />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}

export default Dashboard;

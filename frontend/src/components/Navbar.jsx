function Navbar({ onLogout }) {
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;
        onLogout();
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90">
            <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center">
                
                {/* Brand Identity */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    
                    <span className="text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white">
                        TaskManager
                    </span>
                </div>

                {/* Quiet Action Element */}
                <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 transition-all duration-150 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
import ThemeToggle from "./ThemeToggle";

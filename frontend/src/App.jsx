import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: "dark:!bg-slate-800 dark:!text-slate-100 dark:!border dark:!border-slate-700",
              style: { background: theme === "dark" ? "#1e293b" : "#ffffff", color: theme === "dark" ? "#f8fafc" : "#18181b" },
            }}
          />
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={  <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return <ThemeProvider><AppContent /></ThemeProvider>;
}

export default App;

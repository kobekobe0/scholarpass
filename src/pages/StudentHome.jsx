import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";
import useAuth from "../helper/useAuth";

export default function StudentHome() {
    const isLoading = useAuth();

    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
    }
    return (
        <div>
            <StudentNavbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl text-emerald-800">Student Dashboard</h1>
                <p className="text-lg">Welcome to your dashboard. Here you can view your grades, attendance, and more.</p>
                <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}

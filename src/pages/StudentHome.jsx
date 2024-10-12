import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";
import useAuth from "../helper/useAuth";

export default function StudentHome() {
    const {isLoading} = useAuth();

    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
    };

    return (
        <div>
            <StudentNavbar />
            <div className="flex flex-col items-center justify-start min-h-screen h-fit pb-12 pt-24 bg-gray-100">
                <div className="w-full md:w-3/5 md:px-0 px-4"> {/* Full width on mobile, 2/3 width on desktop */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
    
}

import React, {useState} from 'react'
import useAuth from '../../helper/useAuth';
import Update_COR from './student-components/Update_COR';
import Update_PFP from './student-components/Upadate_PFP';
import UpdateAccount from './student-components/Update_Account';
import UpdatePassword from './student-components/UpdatePassword';

function Student_Profile() {
    const [activeTab, setActiveTab] = React.useState('cor');
    const [file, setFile] = useState(null);
    const {user} = useAuth()

    return (
        <div>
            <h1 className='text-lg mb-8 mx-4 font-semibold'>Account Preference</h1>
            <div className='flex items-center gap-8 xl:flex-row flex-col mb-8'>
                <img src={user?.image} alt="student" className="rounded-full w-28 h-28 object-cover border-4 border-gray-300 shadow-lg"/>
                <div>
                    <h2 className="xl:text-3xl text-xl font-semibold text-gray-800">{user?.name}</h2>
                    <p className="text-md text-gray-600">{user?.department}</p>
                    <p className="text-md text-gray-600">{user?.studentNumber}</p>
                    <div className='flex items-center gap-2 mt-2'>
                        <p className="text-xs bg-green-500 text-white px-4 py-1 rounded-full">{user?.section}</p>
                        <p className="text-xs bg-green-400 text-white px-4 py-1 rounded-full">{user?.yearLevel}</p>
                    </div>
                    
                </div>
            </div>
            <div className="container mx-auto p-2 bg-white rounded-lg shadow-md h-full flex flex-col"> {/* Adjust height based on your layout */}
                    
                    {/* Tab Navigation */}
                    <div className="flex space-x-4 border-b mb-4 overflow-scroll">
                        <button 
                            onClick={() => setActiveTab('cor')} 
                            className={`py-2 px-4 text-sm font-semibold ${activeTab === 'cor' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600 hover:text-green-500'}`}>
                            Update COR
                        </button>
                        <button 
                            onClick={() => setActiveTab('profile')} 
                            className={`py-2 px-4 text-sm font-semibold ${activeTab === 'profile' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-gray-600 hover:emerald-green-500'}`}>
                            Profile
                        </button>
                        <button 
                            onClick={() => setActiveTab('account')} 
                            className={`py-2 px-4 text-sm font-semibold ${activeTab === 'account' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-gray-600 hover:emerald-green-500'}`}>
                            Account
                        </button>
                        <button 
                            onClick={() => setActiveTab('password')} 
                            className={`py-2 px-4 text-sm font-semibold ${activeTab === 'password' ? 'border-b-2 border-emerald-500 text-emerald-500' : 'text-gray-600 hover:emerald-green-500'}`}>
                            Password
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-auto"> {/* Make the content area flexible and scrollable */}
                        {activeTab === 'cor' && (
                            <Update_COR/>
                        )}

                        {activeTab === 'profile' && (
                            <Update_PFP/>
                        )}

                        {activeTab === 'account' && (
                            <UpdateAccount/>
                        )}
                        {activeTab === 'password' && (
                            <UpdatePassword/>
                        )}
                    </div>
                </div>
        </div>
    )
}

export default Student_Profile
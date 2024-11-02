import React, { useEffect, useState, useCallback } from 'react';
import useStudentStore from '../../store/student.store';
import StudentCard from '../../components/admin/StudentCard';
import debounce from '../../helper/debounce';
import useGuardStore from '../../store/guard.store';
import CreateModal from '../../components/admin/guards/CreateModal';

function Guards() {
    const { guards, loading, error, fetchGuards, toggleGuardActiveStatus } = useGuardStore((state) => ({
        guards: state.guards,
        loading: state.loading,
        error: state.error,
        fetchGuards: state.fetchGuards,
        toggleGuardActiveStatus: state.toggleGuardActiveStatus,
    }));

    const [ create, setCreate ] = useState(false);

    useEffect(() => {
        fetchGuards();
    }, []);

    const handleToggle = (id, currentStatus) => {
        toggleGuardActiveStatus(id, !currentStatus);
    };

    const handleCreate = async () => {}
    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between items-center mb-4 px-14 mt-8 rounded-md'>
                <h2 className='text-xl font-semibold text-gray-800'>Guards</h2>
                <div className='flex items-center gap-2'>
                  <button onClick={()=>setCreate(true)} className='bg-emerald-600 text-white hover:bg-emerald-700 transition px-4 py-1 rounded'>Create</button>
                </div>    
            </div>

            {
                create && (
                    <div className='px-12'>
                        <CreateModal setCreate={setCreate} fetchGuards={fetchGuards}/>
                    </div>
                )
            }

            <div className='flex overflow-y-scroll gap-8 flex-col mx-10 h-[75vh]'>
                <div className="w-full mt-4 bg-white p-4">
                {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 text-left font-medium">Name</th>
                                    <th className="py-2 px-4 text-left font-medium">Username</th>
                                    <th className="py-2 px-4 text-left font-medium">Status</th>
                                    <th className="py-2 px-4 text-left font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guards.map((guard) => (
                                    <tr key={guard._id} className="hover:bg-gray-100 py-2">
                                        <td className="py-8 px-4">
                                            {`${guard.name.first} ${guard.name.middle || ''} ${guard.name.last}`}
                                        </td>
                                        <td className="py-2 px-4">{guard.username}</td>
                                        <td className="py-2 px-4">
                                            {guard.active ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="py-2 px-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={guard.active}
                                                    onChange={() => handleToggle(guard._id, guard.active)}
                                                />
                                                <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${guard.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                    <span className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ease-in-out transform ${guard.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </div>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Guards;

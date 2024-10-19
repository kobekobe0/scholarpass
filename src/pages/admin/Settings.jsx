import React, { useEffect, useState } from 'react'
import useConfigStore from '../../store/config.store';
import UpdateEmail from '../../components/admin/admin-settings/UpdateEmail';
import UpdateSchoolYear from '../../components/admin/admin-settings/UpdateSchoolYear';
import UpdateViolations from '../../components/admin/admin-settings/UpdateViolations';

function Settings() {
    const [activeTab, setActiveTab] = useState('account')
    const [violations, setViolations] = useState([])

    const { config, fetchConfig, loading, error } = useConfigStore();

    useEffect(() => {
        fetchConfig();
    }, [])

    useEffect(() => {
        console.log(config)
        if(config) {
            setViolations(config.violationTypes)
            console.log(config)
        }
    }, [config])

    return (
        <div className='flex flex-col w-full h-[95vh]'>
            <div className='flex justify-between items-center my-8 mb-12 mx-4'>
                <h2 className='text-xl'>Settings</h2>
            </div>

            <div className='flex items-start mx-4 flex-grow'>
                <aside className='flex flex-col gap-8 border-r pr-8 py-2 h-full border-black/10'>
                    <button onClick={()=>setActiveTab('account')} className={`flex items-center gap-2 ${activeTab == "account" ? 'text-emerald-700' : 'text-gray-700'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m22.9 21.2l-4.1-4.1c.4-1 .2-2.3-.7-3.1c-.9-.9-2.2-1.1-3.3-.6l1.9 1.9l-1.4 1.4l-2-2c-.5 1.1-.3 2.4.6 3.4c.9.9 2.1 1.1 3.1.7l4.1 4.1c.2.2.5.2.6 0l1-1c.3-.3.3-.6.2-.7M13 20H2v-2c0-2.2 3.6-4 8-4c.5 0 1 0 1.4.1c-.3.6-.4 1.2-.4 1.9c0 1.6.8 3.1 2 4M10 4C7.8 4 6 5.8 6 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4"/></svg>
                        <h1 className='text-sm font-medium'>Admin Account</h1>
                    </button>
                    <button onClick={()=>setActiveTab('SY')} className={`flex items-center gap-2 ${activeTab == "SY" ? 'text-emerald-700' : 'text-gray-700'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3"/></g></svg>
                        <h1 className='text-sm font-medium'>School Year</h1>
                    </button>
                    <button onClick={()=>setActiveTab('violations')} className={`flex items-center gap-2 ${activeTab == "violations" ? 'text-emerald-700' : 'text-gray-700'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5s-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531M10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.72.72 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728m0 11.624c-.619 0-1.11-.51-1.11-1.14s.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14S10.607 16.48 10 16.48"/></svg>                        
                        <h1 className='text-sm font-medium'>Violations</h1>
                    </button>
                </aside>

                <div className='flex-grow'>
                    {activeTab == 'account' && (
                        <UpdateEmail />
                    )}
                    {activeTab == 'SY' && (
                        <UpdateSchoolYear config={config} />
                    )}
                    {activeTab == 'violations' && (
                        <UpdateViolations violationsList={violations} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Settings
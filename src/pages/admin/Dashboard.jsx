import React from 'react'
import useStatsStore from '../../store/stats.store';
import QuickStats from '../../components/admin/QuickStats';
import RecentLogs from '../../components/admin/RecentLogs';
import RecentVisitors from '../../components/admin/RecentVisitors';
import StudentLogChart from '../../components/admin/TrendChart';

function DashboardAdmin() {
    const { statistics, loading, error, fetchStatisticsToday } = useStatsStore();
  return (
    <div className='flex flex-col w-full'>
        <div className='flex justify-between items-center  my-8 mx-4'>
          <h2 className='text-md font-thin'>Dashboard</h2>  
        </div>
        
        <div className='flex justify-between gap-4 flex-col'>
            <QuickStats/>
            <StudentLogChart />
                    
            <RecentLogs/>
            <RecentVisitors/>
        </div>
    </div>
  )
}

export default DashboardAdmin

import React from 'react';

export interface ScheduleItem {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  course: string;
  section: string;
  room: string;
  faculty: string;
  type: 'lecture' | 'tutorial' | 'lab' | 'exam' | 'free';
}

interface ScheduleGridProps {
  scheduleItems: ScheduleItem[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ scheduleItems }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', 
    '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM'
  ];

  // Create a mapping of day-time to schedule item
  const scheduleMap = new Map<string, ScheduleItem>();
  
  scheduleItems.forEach(item => {
    const key = `${item.day}-${item.startTime}`;
    scheduleMap.set(key, item);
  });

  const getScheduleForTimeSlot = (day: string, time: string): ScheduleItem | undefined => {
    return scheduleMap.get(`${day}-${time}`);
  };

  return (
    <div className="overflow-x-auto pb-6">
      <div className="schedule-grid min-w-[800px] w-full">
        {/* Empty top-left cell */}
        <div className="bg-gray-100 p-4 font-semibold text-center">Time/Day</div>
        
        {/* Day headers */}
        {days.map(day => (
          <div key={day} className="bg-gray-100 p-4 font-semibold text-center">
            {day}
          </div>
        ))}
        
        {/* Time slots and schedule cells */}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            {/* Time label */}
            <div className="bg-gray-50 p-3 text-sm md:text-base text-center font-medium flex items-center justify-center">
              {time}
            </div>
            
            {/* Schedule cells for each day */}
            {days.map(day => {
              const scheduleItem = getScheduleForTimeSlot(day, time);
              
              return scheduleItem ? (
                <div 
                  key={`${day}-${time}`} 
                  className={`schedule-cell ${scheduleItem.type} p-3`}
                >
                  <div className="font-semibold text-sm md:text-base">{scheduleItem.course}</div>
                  <div className="text-xs md:text-sm opacity-90">Sec: {scheduleItem.section}</div>
                  <div className="text-xs md:text-sm opacity-90">Room: {scheduleItem.room}</div>
                  <div className="text-xs md:text-sm opacity-90 truncate">{scheduleItem.faculty}</div>
                </div>
              ) : (
                <div key={`${day}-${time}`} className="schedule-cell free p-3">
                  <span className="text-xs md:text-sm">Free</span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleGrid;

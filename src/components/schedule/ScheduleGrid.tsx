import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, MapPin, User } from "lucide-react";

export interface ScheduleItem {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  course: string;
  section: string;
  room: string;
  faculty: string;
  type: string;
  semester?: number;
  sectionNumber?: number;
}

interface ScheduleGridProps {
  scheduleItems: ScheduleItem[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ scheduleItems }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Sort days in correct order
  const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Time slots (based on the schedule data)
  const timeSlots = [
    "8:30-9:00", "9:00-9:30", "9:30-10:00", "10:00-10:30", 
    "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30",
    "12:30-1:00", "1:00-1:30", "1:30-2:00", "2:00-2:30", 
    "2:30-3:00", "3:00-3:30", "3:30-4:00", "4:00-4:30", 
    "4:30-5:00", "5:00-5:30", "5:30-6:00"
  ];

  // Group schedule items by day
  const scheduleByDay = scheduleItems.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  // Get all days present in the schedule (sorted by proper week order)
  const days = Object.keys(scheduleByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  // Format time for display (convert to 12-hour format)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Check if a class occupies a time slot
  const isClassInTimeSlot = (item: ScheduleItem, timeSlot: string) => {
    const [slotStart, slotEnd] = timeSlot.split('-');
    
    // Compare with item's time
    return item.startTime <= slotStart && item.endTime >= slotEnd;
  };

  // Get color class based on course name
  const getCourseColor = (course: string) => {
    const coursePrefix = course.split(' ')[0];
    
    switch (coursePrefix) {
      case 'CSE':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'AA':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'MATH':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'ENG':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max grid grid-cols-[auto_repeat(auto-fill,minmax(150px,1fr))]">
        {/* Header row with days */}
        <div className="sticky left-0 bg-background z-10 border-r p-2 font-semibold">
          Time / Day
        </div>
        {days.map((day) => (
          <div key={day} className="p-2 text-center font-semibold border-b">
            {day}
          </div>
        ))}

        {/* Time slots rows */}
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="contents">
            <div className="sticky left-0 bg-background z-10 border-r p-2 text-sm border-t">
              {formatTime(timeSlot.split('-')[0])}
            </div>

            {/* Schedule cells */}
            {days.map((day) => {
              const classesInSlot = scheduleByDay[day].filter(item => 
                isInTimeRange(timeSlot, `${item.startTime}-${item.endTime}`)
              );
              
              return (
                <div key={`${day}-${timeSlot}`} className="border p-1 border-t min-h-12">
                  {classesInSlot.map(item => (
                    <TooltipProvider key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`text-xs p-1 rounded border cursor-pointer transition-opacity ${getCourseColor(
                              item.course
                            )} ${
                              hoveredItem === item.id
                                ? "opacity-100"
                                : "opacity-80"
                            }`}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <div className="font-medium">{item.course}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin size={10} /> {item.room || "TBD"}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            <div className="font-bold">{item.course}</div>
                            <div className="flex items-center gap-2">
                              <CalendarClock size={14} />
                              <span>
                                {formatTime(item.startTime)} - {formatTime(item.endTime)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              <span>{item.room || "Room TBD"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={14} />
                              <span>{item.faculty}</span>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">
                                Section {item.section}
                              </Badge>
                              <Badge variant="secondary">{item.type}</Badge>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to check if a class time range overlaps with a time slot
function isInTimeRange(timeSlotRange: string, classTimeRange: string): boolean {
  const [slotStart, slotEnd] = timeSlotRange.split('-');
  const [classStart, classEnd] = classTimeRange.split('-');
  
  // Convert times to comparable numbers (e.g., "10:30" -> 10.5)
  const convertToNumber = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };
  
  const slotStartNum = convertToNumber(slotStart);
  const slotEndNum = convertToNumber(slotEnd);
  const classStartNum = convertToNumber(classStart);
  const classEndNum = convertToNumber(classEnd);
  
  // Check if there's any overlap between the time ranges
  return (
    (classStartNum <= slotStartNum && classEndNum > slotStartNum) || // Class starts before slot and ends during/after slot
    (classStartNum >= slotStartNum && classStartNum < slotEndNum) // Class starts during slot
  );
}

export default ScheduleGrid;
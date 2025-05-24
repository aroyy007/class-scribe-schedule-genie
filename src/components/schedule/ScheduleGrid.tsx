
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  
  // Group schedule items by day
  const scheduleByDay = scheduleItems.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  // Get all days present in the schedule (sorted by proper week order)
  const activeDays = Object.keys(scheduleByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  // Format time for display (convert to 12-hour format)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get unique time slots from all schedule items
  const getUniqueTimeSlots = () => {
    const timeSlots = new Set<string>();
    scheduleItems.forEach(item => {
      timeSlots.add(`${item.startTime}-${item.endTime}`);
    });
    return Array.from(timeSlots).sort((a, b) => {
      const [startA] = a.split('-');
      const [startB] = b.split('-');
      const [hoursA, minutesA] = startA.split(':').map(Number);
      const [hoursB, minutesB] = startB.split(':').map(Number);
      return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
    });
  };

  const timeSlots = getUniqueTimeSlots();

  // Find classes for a specific day and time slot
  const getClassForDayAndTime = (day: string, timeSlot: string) => {
    if (!scheduleByDay[day]) return null;
    return scheduleByDay[day].find(item => 
      `${item.startTime}-${item.endTime}` === timeSlot
    );
  };

  if (scheduleItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No schedule data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">CLASS SCHEDULE</h3>
      
      {activeDays.map(day => (
        <div key={day} className="mb-8">
          <h4 className="text-md font-semibold mb-3 text-center bg-gray-100 py-2 rounded">
            {day.toUpperCase()}
          </h4>
          
          <Table className="border">
            <TableHeader>
              <TableRow className="bg-gray-600">
                <TableHead className="text-white font-semibold text-center border border-gray-400">
                  Room
                </TableHead>
                {timeSlots.map(timeSlot => {
                  const [startTime, endTime] = timeSlot.split('-');
                  const hasClassOnDay = scheduleByDay[day]?.some(item => 
                    `${item.startTime}-${item.endTime}` === timeSlot
                  );
                  
                  if (!hasClassOnDay) return null;
                  
                  return (
                    <TableHead key={timeSlot} className="text-white font-semibold text-center border border-gray-400 min-w-[120px]">
                      {formatTime(startTime)} – {formatTime(endTime)}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Get unique rooms for this day */}
              {Array.from(new Set(scheduleByDay[day]?.map(item => item.room) || [])).map(room => (
                <TableRow key={room} className="border">
                  <TableCell className="font-medium bg-gray-600 text-white text-center border border-gray-400">
                    {room}
                  </TableCell>
                  {timeSlots.map(timeSlot => {
                    const classItem = scheduleByDay[day]?.find(item => 
                      item.room === room && `${item.startTime}-${item.endTime}` === timeSlot
                    );
                    
                    const hasClassOnDay = scheduleByDay[day]?.some(item => 
                      `${item.startTime}-${item.endTime}` === timeSlot
                    );
                    
                    if (!hasClassOnDay) return null;
                    
                    return (
                      <TableCell key={timeSlot} className="text-center border border-gray-400 p-2">
                        {classItem ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="cursor-pointer p-2 rounded transition-colors hover:bg-gray-50"
                                  onMouseEnter={() => setHoveredItem(classItem.id)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <div className="font-medium text-sm">
                                    {classItem.course}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    ({classItem.faculty.replace(/^(Mr\.|Ms\.|Dr\.)\s*/, '')})
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2">
                                  <div className="font-bold">{classItem.course}</div>
                                  <div className="flex items-center gap-2">
                                    <CalendarClock size={14} />
                                    <span>
                                      {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    <span>{classItem.room}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <User size={14} />
                                    <span>{classItem.faculty}</span>
                                  </div>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="outline">
                                      Section {classItem.section}
                                    </Badge>
                                    <Badge variant="secondary">{classItem.type}</Badge>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <div className="h-12"></div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ScheduleGrid;

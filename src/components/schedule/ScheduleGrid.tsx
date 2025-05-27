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

const courseColors = {
  'CSE 328 (Uday)': '#8BC34A',    // Green
  'ME 102 (AHN)': '#FFEB3B',      // Yellow
  'CSE 327 (Uday)': '#90CAF9',    // Blue
  'CSE 321 (TJ)': '#FFF59D',      // Light Yellow
  'CSE 322 (TJ)': '#80DEEA',      // Cyan
  'CSE 411 (Saklain)': '#EF9A9A', // Red
  // Add more as needed
};

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ scheduleItems }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Get all unique days in week order
  const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const allDays = daysOrder.filter(day => scheduleItems.some(item => item.day === day));
  // Get all unique time slots in order
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
  // Get all unique rooms in order of appearance
  const allRooms = Array.from(new Set(scheduleItems.map(item => item.room)));

  // Helper to find class for a given day, time slot, and room
  const getClassFor = (day: string, timeSlot: string, room: string) => {
    return scheduleItems.find(item =>
      item.day === day &&
      `${item.startTime}-${item.endTime}` === timeSlot &&
      item.room === room
    );
  };

  // Format time for display (convert to 12-hour format)
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Helper: generate a color for a course code (not too bright or light)
  function getCourseColor(course: string) {
    // Hash course code to a color in a fixed palette
    const palette = [
      'bg-blue-200 text-blue-900',
      'bg-green-200 text-green-900',
      'bg-yellow-200 text-yellow-900',
      'bg-purple-200 text-purple-900',
      'bg-pink-200 text-pink-900',
      'bg-orange-200 text-orange-900',
      'bg-teal-200 text-teal-900',
      'bg-red-200 text-red-900',
      'bg-indigo-200 text-indigo-900',
      'bg-amber-200 text-amber-900',
    ];
    let hash = 0;
    for (let i = 0; i < course.length; i++) hash = course.charCodeAt(i) + ((hash << 5) - hash);
    return palette[Math.abs(hash) % palette.length];
  }

  // For each day, render a separate, compact table
  return (
    <div className="w-full flex flex-col gap-4">
      {allDays.map(day => {
        // Get all time slots for this day
        const slots = Array.from(new Set(scheduleItems.filter(item => item.day === day).map(item => `${item.startTime}-${item.endTime}`)))
          .sort((a, b) => {
            const [startA] = a.split('-');
            const [startB] = b.split('-');
            const [hoursA, minutesA] = startA.split(':').map(Number);
            const [hoursB, minutesB] = startB.split(':').map(Number);
            return (hoursA * 60 + minutesA) - (hoursB * 60 + minutesB);
          });
        // Get all rooms for this day
        const rooms = Array.from(new Set(scheduleItems.filter(item => item.day === day).map(item => item.room)));
        // Helper to get course for a cell
        const getCourse = (room: string, slot: string) => {
          const found = scheduleItems.find(item => item.day === day && item.room === room && `${item.startTime}-${item.endTime}` === slot);
          return found ? found.course : '';
        };
        return (
          <div key={day} className="w-full">
            <h4 className="text-sm font-semibold mb-1 text-center bg-gray-100 py-1 rounded tracking-wide">{day.toUpperCase()}</h4>
            <Table className="border w-[95vw] max-w-full mx-auto text-xs">
              <TableHeader>
                <TableRow className="bg-gray-600">
                  <TableHead className="text-white font-semibold text-center border border-gray-400 min-w-[60px] px-2 py-1">Room</TableHead>
                  {slots.map(slot => {
                    const [start, end] = slot.split('-');
                    return (
                      <TableHead key={slot} className="text-white font-semibold text-center border border-gray-400 min-w-[80px] px-2 py-1">
                        {formatTime(start)}<br />-<br />{formatTime(end)}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map(room => (
                  <TableRow key={room} className="border">
                    <TableCell className="font-medium bg-gray-600 text-white text-center border border-gray-400 px-2 py-1">{room}</TableCell>
                    {slots.map(slot => {
                      const course = getCourse(room, slot);
                      return (
                        <TableCell key={slot} className={`text-center border border-gray-400 px-1 py-1`}>
                          {course && (
                            <span className={`block rounded font-semibold text-xs px-1 py-0.5 ${getCourseColor(course)}`}>{course}</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleGrid;

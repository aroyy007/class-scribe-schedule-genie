
import ScheduleSelector from "@/components/student/ScheduleSelector";

const StudentPortal = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Student Portal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="col-span-full w-full">
          <ScheduleSelector />
        </div>
        {/* <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">How To Use</h2>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal pl-4">
              <li>
                <span className="font-medium text-gray-800">Select your semester</span>
                <p>Choose your current semester from the dropdown menu</p>
              </li>
              <li>
                <span className="font-medium text-gray-800">Select your section</span>
                <p>Choose your assigned class section from the dropdown menu</p>
              </li>
              <li>
                <span className="font-medium text-gray-800">Generate your schedule</span>
                <p>Click the 'Generate Schedule' button to view your personalized timetable</p>
              </li>
              <li>
                <span className="font-medium text-gray-800">Save or export</span>
                <p>Download as PDF or add to your calendar for easy access</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-schedule-lecture rounded-sm mr-2"></div>
                <span className="text-sm">Lecture</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-schedule-tutorial rounded-sm mr-2"></div>
                <span className="text-sm">Tutorial</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-schedule-lab rounded-sm mr-2"></div>
                <span className="text-sm">Lab</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-schedule-exam rounded-sm mr-2"></div>
                <span className="text-sm">Exam</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-schedule-free rounded-sm mr-2"></div>
                <span className="text-sm">Free Time</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StudentPortal;

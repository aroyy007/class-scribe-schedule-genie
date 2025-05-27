
import ScheduleSelector from "@/components/student/ScheduleSelector";
import FacultySearch from "@/components/student/FacultySearch";

const StudentPortal = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Student Portal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FacultySearch />
          <ScheduleSelector />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 mb-6 animate-slide-in-right">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <h3 className="font-medium text-primary">Faculty Search</h3>
                <p className="text-sm text-gray-600">Search for faculty information by code</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                <h3 className="font-medium text-primary">Schedule Generator</h3>
                <p className="text-sm text-gray-600">Generate your class schedule</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Use faculty codes like "UDD" for search</p>
              <p>• Generate schedules by selecting semester and section</p>
              <p>• Contact support for technical issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;

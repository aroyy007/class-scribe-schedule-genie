
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import FileUploader from "@/components/admin/FileUploader";
import ExtractedDataTable from "@/components/admin/ExtractedDataTable";

// Mock data for demonstration
const mockExtractedData = [
  {
    id: "1",
    code: "CSE 321",
    name: "Software Engineering",
    section: "1",
    faculty: "Dr. Smith",
    room: "401",
    day: "Monday",
    time: "8:30 AM - 10:00 AM",
    confidence: 0.95,
  },
  {
    id: "2",
    code: "CSE 331",
    name: "Computer Architecture",
    section: "2",
    faculty: "Dr. Johnson",
    room: "402",
    day: "Monday",
    time: "11:30 AM - 1:00 PM",
    confidence: 0.88,
  },
  {
    id: "3",
    code: "CSE 311",
    name: "Database Systems",
    section: "3",
    faculty: "Prof. Williams",
    room: "303",
    day: "Tuesday",
    time: "9:30 AM - 11:00 AM",
    confidence: 0.92,
  },
  {
    id: "4",
    code: "CSE 421",
    name: "Machine Learning",
    section: "1",
    faculty: "Dr. Brown",
    room: "505",
    day: "Wednesday",
    time: "2:30 PM - 4:00 PM",
    confidence: 0.78,
  },
  {
    id: "5",
    code: "CSE 411",
    name: "Artificial Intelligence",
    section: "2",
    faculty: "Prof. Davis",
    room: "301",
    day: "Thursday",
    time: "10:30 AM - 12:00 PM",
    confidence: 0.85,
  },
  {
    id: "6",
    code: "CSE 341",
    name: "Operating Systems",
    section: "1",
    faculty: "Dr. Wilson",
    room: "404",
    day: "Friday",
    time: "1:30 PM - 3:00 PM",
    confidence: 0.62,
  },
  {
    id: "7",
    code: "ENG 201",
    name: "Technical Writing",
    section: "2",
    faculty: "Prof. Miller",
    room: "201",
    day: "Wednesday",
    time: "8:30 AM - 10:00 AM",
    confidence: 0.45,
  }
];

const AdminDashboard = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="data">Extracted Data</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
              <p className="text-gray-600 mb-6">
                Upload PDF documents containing course information and class schedules.
                Our system will automatically extract and process the data.
              </p>
              <div className="p-4 bg-blue-50 rounded-md mb-6">
                <h3 className="font-medium text-blue-700 mb-2">Tips for Better Results</h3>
                <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
                  <li>Use clear, text-based PDF documents</li>
                  <li>Ensure consistent formatting across files</li>
                  <li>Check that course codes follow standard patterns</li>
                  <li>Include section numbers with course codes</li>
                  <li>Keep time formats consistent (e.g. 8:30 AM)</li>
                </ul>
              </div>
            </div>
            <FileUploader />
          </div>
        </TabsContent>
        
        <TabsContent value="data">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
              <p className="text-gray-600 mb-6">
                Review and edit the data extracted from your uploaded documents.
                Items with lower confidence scores are highlighted for your attention.
              </p>
            </div>
            <ExtractedDataTable data={mockExtractedData} />
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              <p className="text-gray-600 mb-6">
                Configure system settings, data formats, and processing options.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-medium mb-4">Coming soon!</h3>
              <p className="text-muted-foreground">
                This feature is currently under development. Check back later.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

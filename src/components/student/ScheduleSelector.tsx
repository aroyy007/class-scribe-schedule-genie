import { useState } from "react";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ScheduleGrid, { ScheduleItem } from "../schedule/ScheduleGrid";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getScheduleFromCSV } from './getScheduleFromCSV';
import Papa from 'papaparse';

const ScheduleSelector = () => {
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api';

  const handleGenerateSchedule = async () => {
    if (!semester || !section) {
      setError("Please select both semester and section");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Instead of backend API, load from CSV
      const csvData = await getScheduleFromCSV(semester, section);
      // Transform CSV data to match ScheduleItem structure
      const scheduleData = csvData.map((item: Record<string, string>) => {
        // Parse time range
        let startTime = '', endTime = '';
        if (item.time && item.time.includes('-')) {
          [startTime, endTime] = item.time.split('-').map((t: string) => t.trim());
        }
        return {
          id: `${item.course_code}-${item.section}-${item.day}-${item.time}`,
          day: item.day,
          startTime,
          endTime,
          course: item.course_code,
          section: item.section,
          room: item.room || 'TBD',
          faculty: item.instructor || 'TBA',
          type: 'lecture',
          semester: Number(item.semester),
          sectionNumber: Number(item.section)
        };
      });
      setSchedule(scheduleData);
      setShowSchedule(scheduleData.length > 0);
      if (scheduleData.length === 0) {
        setError("No schedule found for the selected semester and section");
      }
    } catch (err) {
      setError("Failed to load schedule from CSV. Please try again.");
      setShowSchedule(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setPdfLoading(true);
      
      const response = await axios.post(
        `${API_URL}/generate-pdf`,
        schedule,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `schedule-sem-${semester}-sec-${section}.pdf`);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
    } catch {
      console.error('PDF download failed');
      setError("Failed to download PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const clearSchedule = () => {
    setShowSchedule(false);
    setSchedule([]);
    setError(null);
  };

  return (
    <Card className="w-full max-w-none mx-auto">
      <CardHeader>
        <CardTitle>Generate Your Class Schedule</CardTitle>
        <CardDescription>
          Select your semester and section to view your personalized class schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="semester" className="text-sm font-medium">
              Semester
            </label>
            <Select
              value={semester}
              onValueChange={(value) => {
                setSemester(value);
                clearSchedule();
              }}
            >
              <SelectTrigger id="semester">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
                <SelectItem value="7">Semester 7</SelectItem>
                <SelectItem value="8">Semester 8</SelectItem>
                <SelectItem value="9">Semester 9</SelectItem>
                <SelectItem value="10">Semester 10</SelectItem>
                <SelectItem value="11">Semester 11</SelectItem>
                <SelectItem value="12">Semester 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="section" className="text-sm font-medium">
              Section
            </label>
            <Select
              value={section}
              onValueChange={(value) => {
                setSection(value);
                clearSchedule();
              }}
            >
              <SelectTrigger id="section">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Section 1</SelectItem>
                <SelectItem value="2">Section 2</SelectItem>
                <SelectItem value="3">Section 3</SelectItem>
                <SelectItem value="4">Section 4</SelectItem>
                <SelectItem value="5">Section 5</SelectItem>
                <SelectItem value="6">Section 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center mt-4">
          <Button 
            onClick={handleGenerateSchedule} 
            disabled={!semester || !section || loading}
            className="w-full md:w-auto"
          >
            {loading ? "Generating..." : "Generate Schedule"}
          </Button>
        </div>

        {loading && (
          <div className="mt-6">
            <p className="text-sm text-center mb-2">Generating your schedule...</p>
            <Progress value={65} className="h-2" />
          </div>
        )}
      </CardContent>

      {showSchedule && !loading && schedule.length > 0 && (
        <CardContent className="pt-4 border-t">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Schedule for Semester {semester}, Section {section}
            </h3>
            <p className="text-sm text-muted-foreground">
              Found {schedule.length} classes for your schedule. You can download it as PDF or add it to your calendar.
            </p>
          </div>
          
          <ScheduleGrid scheduleItems={schedule} />
          
          <div className="flex flex-wrap justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadPDF}
              disabled={pdfLoading}
            >
              {pdfLoading ? "Downloading..." : "Download PDF"}
            </Button>
            <Button variant="outline" size="sm">
              Add to Calendar
            </Button>
            <Button size="sm">
              Share
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ScheduleSelector;
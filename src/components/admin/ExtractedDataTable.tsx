
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CourseData {
  id: string;
  code: string;
  name: string;
  section: string;
  faculty: string;
  room: string;
  day: string;
  time: string;
  confidence: number;
}

interface ExtractedDataTableProps {
  data: CourseData[];
}

const ExtractedDataTable: React.FC<ExtractedDataTableProps> = ({ data }) => {
  const [editableData, setEditableData] = useState<CourseData[]>(data);

  const handleChange = (id: string, field: keyof CourseData, value: string) => {
    setEditableData(prevData => 
      prevData.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="p-4">
          <h3 className="text-lg font-medium">Extracted Data Preview</h3>
          <p className="text-sm text-muted-foreground">
            Review and edit the extracted course data before saving.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editableData.map((course) => (
                <TableRow key={course.id} className={course.confidence < 0.7 ? "bg-red-50" : ""}>
                  <TableCell>
                    <Input
                      value={course.code}
                      onChange={(e) => handleChange(course.id, "code", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.name}
                      onChange={(e) => handleChange(course.id, "name", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.section}
                      onChange={(e) => handleChange(course.id, "section", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.faculty}
                      onChange={(e) => handleChange(course.id, "faculty", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.room}
                      onChange={(e) => handleChange(course.id, "room", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.day}
                      onChange={(e) => handleChange(course.id, "day", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.time}
                      onChange={(e) => handleChange(course.id, "time", e.target.value)}
                      className={course.confidence < 0.7 ? "border-red-300" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block w-full h-2 bg-gray-200 rounded-full overflow-hidden`}>
                      <span
                        className={`h-full block rounded-full ${
                          course.confidence > 0.8
                            ? "bg-green-500"
                            : course.confidence > 0.6
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${course.confidence * 100}%` }}
                      ></span>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ExtractedDataTable;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Calculator } from "lucide-react";

interface Course {
  id: number;
  courseName: string;
  credits: number;
  gradePoint: number;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, courseName: "", credits: 0, gradePoint: 0 }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => {
    const newId = Math.max(...courses.map(c => c.id)) + 1;
    setCourses([...courses, { id: newId, courseName: "", credits: 0, gradePoint: 0 }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(course => 
      course.credits > 0 && course.gradePoint >= 0
    );

    if (validCourses.length === 0) {
      setGpa(null);
      return;
    }

    const totalWeightedPoints = validCourses.reduce((sum, course) => 
      sum + (course.gradePoint * course.credits), 0
    );
    const totalCredits = validCourses.reduce((sum, course) => sum + course.credits, 0);
    
    const calculatedGPA = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;
    setGpa(Math.round(calculatedGPA * 100) / 100);
  };

  return (
    <div className="container py-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-in-left">
          <h1 className="text-4xl font-bold text-primary mb-4">🎯 GPA Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your Grade Point Average easily</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Course Information
            </CardTitle>
            <CardDescription>
              Enter your course details to calculate your GPA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Course Input Rows */}
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Name</label>
                    <Input
                      placeholder="e.g., Mathematics"
                      value={course.courseName}
                      onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credits</label>
                    <Input
                      type="number"
                      placeholder="3"
                      min="0"
                      step="0.5"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade Point</label>
                    <Input
                      type="number"
                      placeholder="4.0"
                      min="0"
                      max="4"
                      step="0.1"
                      value={course.gradePoint || ''}
                      onChange={(e) => updateCourse(course.id, 'gradePoint', parseFloat(e.target.value) || 0)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="hover-scale"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={addCourse}
                variant="outline"
                className="flex items-center gap-2 hover-lift"
              >
                <Plus className="h-4 w-4" />
                Add More Course
              </Button>
              <Button
                onClick={calculateGPA}
                className="flex items-center gap-2 hover-scale bg-primary hover:bg-primary/90"
              >
                <Calculator className="h-4 w-4" />
                Calculate GPA
              </Button>
            </div>

            {/* Result Display */}
            {gpa !== null && (
              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center animate-bounce-in">
                <h3 className="text-2xl font-bold text-primary mb-2">Your GPA</h3>
                <div className="text-4xl font-bold text-primary">{gpa.toFixed(2)}</div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {courses.filter(c => c.credits > 0).length} courses
                </p>
              </div>
            )}

            {/* Formula Display */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Formula Used:</h4>
              <p className="text-sm text-gray-600">
                GPA = Σ(Grade Point × Credits) ÷ Σ(Credits)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GPACalculator;

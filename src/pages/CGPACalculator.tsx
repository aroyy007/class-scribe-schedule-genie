
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Calculator } from "lucide-react";

interface Semester {
  id: number;
  semesterNumber: string;
  credits: number;
  gpa: number;
}

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, semesterNumber: "", credits: 0, gpa: 0 }
  ]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addSemester = () => {
    const newId = Math.max(...semesters.map(s => s.id)) + 1;
    setSemesters([...semesters, { id: newId, semesterNumber: "", credits: 0, gpa: 0 }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    }
  };

  const updateSemester = (id: number, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  const calculateCGPA = () => {
    const validSemesters = semesters.filter(semester => 
      semester.credits > 0 && semester.gpa >= 0
    );

    if (validSemesters.length === 0) {
      setCgpa(null);
      return;
    }

    const totalWeightedGPA = validSemesters.reduce((sum, semester) => 
      sum + (semester.gpa * semester.credits), 0
    );
    const totalCredits = validSemesters.reduce((sum, semester) => sum + semester.credits, 0);
    
    const calculatedCGPA = totalCredits > 0 ? totalWeightedGPA / totalCredits : 0;
    setCgpa(Math.round(calculatedCGPA * 100) / 100);
  };

  return (
    <div className="container py-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-in-left">
          <h1 className="text-4xl font-bold text-primary mb-4">🧮 CGPA Calculator</h1>
          <p className="text-lg text-gray-600">Calculate your Cumulative Grade Point Average</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Semester Information
            </CardTitle>
            <CardDescription>
              Enter your semester details to calculate your CGPA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Semester Input Rows */}
            <div className="space-y-4">
              {semesters.map((semester, index) => (
                <div 
                  key={semester.id} 
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Semester Number</label>
                    <Input
                      placeholder="e.g., Fall 2023"
                      value={semester.semesterNumber}
                      onChange={(e) => updateSemester(semester.id, 'semesterNumber', e.target.value)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credits</label>
                    <Input
                      type="number"
                      placeholder="15"
                      min="0"
                      step="0.5"
                      value={semester.credits || ''}
                      onChange={(e) => updateSemester(semester.id, 'credits', parseFloat(e.target.value) || 0)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GPA</label>
                    <Input
                      type="number"
                      placeholder="3.75"
                      min="0"
                      max="4"
                      step="0.01"
                      value={semester.gpa || ''}
                      onChange={(e) => updateSemester(semester.id, 'gpa', parseFloat(e.target.value) || 0)}
                      className="transition-all hover:border-primary focus:border-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeSemester(semester.id)}
                      disabled={semesters.length === 1}
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
                onClick={addSemester}
                variant="outline"
                className="flex items-center gap-2 hover-lift"
              >
                <Plus className="h-4 w-4" />
                Add Semester
              </Button>
              <Button
                onClick={calculateCGPA}
                className="flex items-center gap-2 hover-scale bg-primary hover:bg-primary/90"
              >
                <Calculator className="h-4 w-4" />
                Calculate CGPA
              </Button>
            </div>

            {/* Result Display */}
            {cgpa !== null && (
              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center animate-bounce-in">
                <h3 className="text-2xl font-bold text-primary mb-2">Your CGPA</h3>
                <div className="text-4xl font-bold text-primary">{cgpa.toFixed(2)}</div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {semesters.filter(s => s.credits > 0).length} semesters
                </p>
              </div>
            )}

            {/* Formula Display */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Formula Used:</h4>
              <p className="text-sm text-gray-600">
                CGPA = Σ(GPA × Credits) ÷ Σ(Credits)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CGPACalculator;

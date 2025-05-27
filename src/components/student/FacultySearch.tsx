
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Faculty {
  code: string;
  shortName: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  concentration: string;
  school: string;
}

// Mock faculty data - replace with actual data source
const facultyData: Faculty[] = [
  {
    code: "UDD",
    shortName: "UDD",
    fullName: "Udoy Das",
    email: "udoy.d@eastdelta.edu.bd",
    mobile: "",
    designation: "Lecturer",
    concentration: "",
    school: "SoSET"
  },
  // Add more faculty members as needed
];

const FacultySearch = () => {
  const [searchCode, setSearchCode] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchCode.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const faculty = facultyData.find(
        f => f.code.toLowerCase() === searchCode.toLowerCase()
      );
      
      if (faculty) {
        setSelectedFaculty(faculty);
        setIsDialogOpen(true);
      } else {
        // Handle not found case
        alert('Faculty not found');
      }
      setIsSearching(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="bg-white border rounded-lg p-6 mb-8 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-primary">Faculty Search</h2>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter faculty code (e.g., UDD)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchCode.trim()}
            className="min-w-[120px] transition-all duration-200 hover:scale-105"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </div>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">Faculty Details</DialogTitle>
          </DialogHeader>
          
          {selectedFaculty && (
            <div className="space-y-4 mt-4">
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 space-y-3 animate-fade-in">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Short Name:</span>
                    <span className="font-semibold text-primary">{selectedFaculty.shortName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Name of Faculty:</span>
                    <span className="font-semibold">{selectedFaculty.fullName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {selectedFaculty.email}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Mobile:</span>
                    <span className="text-sm">{selectedFaculty.mobile || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Designation:</span>
                    <span className="font-medium">{selectedFaculty.designation}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Concentration:</span>
                    <span className="text-sm">{selectedFaculty.concentration || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">School:</span>
                    <span className="font-semibold text-primary">{selectedFaculty.school}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacultySearch;


import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Calendar } from "lucide-react";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type === "application/pdf") {
        files.push(fileList[i]);
      }
    }

    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    
    // This is a placeholder for the actual upload process
    setTimeout(() => {
      setUploading(false);
      setSelectedFiles([]);
      // Display a success message or trigger next steps
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload PDF Documents</CardTitle>
        <CardDescription>
          Upload course offerings and class schedule PDFs for processing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="grid gap-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="border-2 border-dashed rounded-md p-8 text-center hover:border-primary transition-colors">
                <Calendar className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
                <div className="text-sm font-medium mb-1">
                  Drag and drop your PDF files or click to browse
                </div>
                <div className="text-xs text-muted-foreground">
                  Only PDF files are accepted
                </div>
              </div>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".pdf" 
                multiple 
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="border rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
              <ul className="space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-xs flex items-center justify-between">
                    <span className="truncate">{file.name}</span>
                    <span className="text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={selectedFiles.length === 0 || uploading} 
          className="w-full"
        >
          {uploading ? "Processing..." : "Upload and Process"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUploader;

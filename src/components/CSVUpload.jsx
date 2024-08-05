import { useState } from 'react';
import Papa from 'papaparse';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CSVUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          onUpload(results.data, file);
        },
        header: true,
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!file}>
        Upload CSV
      </Button>
    </div>
  );
};

export default CSVUpload;
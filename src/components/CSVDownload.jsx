import Papa from 'papaparse';
import { Button } from "@/components/ui/button";

const CSVDownload = ({ data, fileName }) => {
  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName || 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button onClick={handleDownload}>
      Download CSV
    </Button>
  );
};

export default CSVDownload;
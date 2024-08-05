import { useState } from 'react';
import CSVUpload from '../components/CSVUpload';
import CSVTable from '../components/CSVTable';
import CSVDownload from '../components/CSVDownload';

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleDataUpload = (data, file) => {
    setCsvData(data);
    setFileName(file.name);
  };

  const handleDataChange = (newData) => {
    setCsvData(newData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">CSV Management Tool</h1>
        <p className="text-xl text-gray-600">Easily upload, edit, and download CSV files.</p>
      </header>

      <main>
        <section className="mb-8">
          <CSVUpload onUpload={handleDataUpload} />
          {fileName && <p className="mt-2">Uploaded file: {fileName}</p>}
        </section>

        {csvData.length > 0 && (
          <>
            <section className="mb-8">
              <CSVTable data={csvData} onDataChange={handleDataChange} />
            </section>

            <section>
              <CSVDownload data={csvData} fileName={fileName} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
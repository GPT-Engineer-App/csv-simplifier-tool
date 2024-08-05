import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CSVTable = ({ data, onDataChange }) => {
  const [tableData, setTableData] = useState(data);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setTableData(data);
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
    }
  }, [data]);

  const handleCellChange = (rowIndex, header, value) => {
    const newData = [...tableData];
    newData[rowIndex][header] = value;
    setTableData(newData);
    onDataChange(newData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    const newData = [...tableData, newRow];
    setTableData(newData);
    onDataChange(newData);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
    onDataChange(newData);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={`${rowIndex}-${header}`}>
                  <Input
                    value={row[header]}
                    onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteRow(rowIndex)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={handleAddRow}>
        Add Row
      </Button>
    </div>
  );
};

export default CSVTable;
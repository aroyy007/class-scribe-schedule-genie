import Papa from 'papaparse';

export async function getScheduleFromCSV(semester: string, section: string): Promise<Record<string, string>[]> {
  return new Promise((resolve, reject) => {
    fetch('/backend/data/class_schedule.csv')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch CSV');
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Filter by semester and section
            const filtered = (results.data as Record<string, string>[]).filter((row) => {
              return (
                String(row.semester) === String(semester) &&
                String(row.section) === String(section)
              );
            });
            resolve(filtered);
          },
          error: (err) => reject(err),
        });
      })
      .catch(reject);
  });
}

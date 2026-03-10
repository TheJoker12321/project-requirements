import csv from 'csv-parser'
import { Readable } from 'stream';

export function loadCSV(buffer) {

    const results = [];

    const stream = Readable.from(buffer)
    
    return new Promise((resolve, reject) => {
        stream
            .pipe(csv({delimiter: ";", columns: true , relax_quotes: true, from_line: 2} ))
            .on("data", (data) => {
            
                results.push(data);
            })
            .on("error", (error) => reject(results))
            .on("end", () => {
                resolve(results);
            });
    });
}
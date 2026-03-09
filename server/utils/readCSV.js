import csv from 'csv-parser'
import fs from 'fs'

const results = [];

export function loadCSV(filepath) {
  return new Promise((resolve, reject) => {
    fs
      .createReadStream(filepath)
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
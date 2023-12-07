// Function to read and return the saved response data
import fs from "fs";
import { isEqual } from "lodash";
import path from "path";
import { diff } from "deep-diff";

function replay(path) {
  try {
    return readDataFromFile(path);
  } catch (error) {
    console.error("Error reading saved response data:", error.message);
    return null;
  }
}

// Function to fetch data from the API and save it to a file
export async function request(
  apiFetch,
  name,
  options = {
    record: true,
    replay: true,
    override: true,
    path: "./response.json",
    ignoreFields: [],
  },
) {
  try {
    const filePath = `${name}/${options.path}`;
    if (options.replay) {
      const mockData = replay(filePath);
      if (mockData != null) {
        return mockData;
      }
    }

    const response = await apiFetch;

    if (options.record) {
      const savedData =
        options.ignoreFields.length > 0
          ? omitFields(response, options.ignoreFields)
          : response;

      if (fs.existsSync(filePath)) {
        const previousData = readDataFromFile(filePath);
        if (options.override || !isEqual(previousData, savedData)) {
          const differences = diff(previousData, savedData);
          console.log("Differences:", differences);
        }
      }

      saveDataToFile(options.path, name, savedData);
    }

    return response;
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
}

function omitFields(obj, fields) {
  return fields.reduce((acc, field) => {
    const newObj = { ...acc };
    delete newObj[field];
    return newObj;
  }, obj);
}

function saveDataToFile(file, name, data) {
  const directoryPath = path.join(__dirname, name);
  if (!fs.existsSync(directoryPath)) {
    // Create the directory if it doesn't exist
    fs.mkdirSync(directoryPath, { recursive: true });
  }
  const filePath = path.join(directoryPath, file);
  const currentData = JSON.stringify({ result: data }, null, 2);
  fs.writeFileSync(filePath, currentData);
}

function readDataFromFile(file) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } else {
    console.error("Couldn't find file");
    return null;
  }
}

/*
  Ways to optimize this further:

  1. Being able to save default options and override them
  2. Instead of overriding a file on every write, creating a ID
  or key to update the file when a similar request comes in
  3. Storing more metadata of the request to the recording
*/

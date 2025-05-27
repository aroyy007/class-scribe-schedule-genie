import pandas as pd
from pymongo import MongoClient
import re
import sys

# ========================
# CONFIGURATION
# ========================
MONGO_URI = "mongodb+srv://arijitroy0328:arijit123@cluster0.app05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "class_scheduler"
COLLECTION_NAME = "schedules"
EXCEL_PATH = "abc.xlsx"

# Semester-course mapping (From PDF structure)
SEMESTER_COURSES = {
    1: ["CSE 111", "CSE 112", "AA 099", "AA 150", "AA 200"],
    2: ["CSE 113", "CSE 114", "MATH 107", "ENG 111", "PHY 101", "PHY 102"],
    3: ["CSE 211", "CSE 212", "MATH 207", "CHEM 201", "EEE 111", "EEE 112"],
    4: ["CSE 123", "CSE 124", "CSE 115", "EEE 213", "EEE 214", "HUM 201"],
    5: ["CSE 221", "CSE 222", "CSE 225", "CSE 215", "CSE 216", "CSE 226", "ENG 112"],
    6: ["CSE 315", "CSE 316", "CSE 311", "CSE 312", "CSE 313", "HUM 203"],
    7: ["CSE 325", "CSE 326", "MATH 203", "CSE 223", "CSE 224", "CSE 242", "ENG 112"],
    8: ["MATH 301", "CSE 319", "CSE 320", "HUM 301", "CSE 317", "CSE 342"],
    9: ["CSE 327", "CSE 328", "CSE 411", "CSE 321", "CSE 322", "CSE 464", "ME 102"],
    10: ["CSE 439", "CSE 443", "CSE 435", "CSE 436", "CSE 463"],
    11: ["CSE 459", "CSE 464", "IPD 400"],
    12: ["CSE 400"]
}

# ========================
# DATA PROCESSING FUNCTIONS
# ========================

def load_faculty_mapping():
    """Load faculty short code to name mapping"""
    try:
        df = pd.read_excel(
            EXCEL_PATH,
            sheet_name="Faculty Name",
            skiprows=2,
            usecols="B:C",
            names=["Name", "ShortForm"]
        )
        return dict(zip(df["ShortForm"], df["Name"]))
    except Exception as e:
        print(f"Error loading faculty data: {str(e)}")
        sys.exit(1)

def process_timetable(faculty_map):
    """Process timetable data from Excel"""
    try:
        sheets = ["Class Routine", "Copy of Class Routine"]
        all_data = []
        
        for sheet in sheets:
            df = pd.read_excel(EXCEL_PATH, sheet_name=sheet, header=None)
            current_day = None
            time_slots = []
            
            for _, row in df.iterrows():
                row = row.ffill()
                first_cell = str(row[0]).strip()
                
                # Detect day headers
                if first_cell in ["Saturday", "Sunday", "Monday", "Tuesday", 
                                 "Wednesday", "Thursday"]:
                    current_day = first_cell
                    time_slots = []
                
                # Detect time slots
                elif ":" in str(row[1]):
                    time_slots = [str(cell).strip() for cell in row[1:7] if pd.notna(cell)]
                
                # Process course entries
                elif current_day and (first_cell.startswith("N") or any(c.isdigit() for c in first_cell)):
                    room = first_cell.split('.')[0]
                    for idx, cell in enumerate(row[1:7]):
                        if pd.notna(cell) and isinstance(cell, str):
                            # Extract course and instructor
                            parts = re.match(r"([\w\s.]+)\s*\(([A-Z]+)\)", cell)
                            if parts:
                                course = parts.group(1).strip()
                                instructor_code = parts.group(2)
                                instructor = faculty_map.get(instructor_code, "TBA")
                                
                                if idx < len(time_slots):
                                    all_data.append({
                                        "Course": course,
                                        "Day": current_day,
                                        "Time": time_slots[idx],
                                        "Room": room,
                                        "Instructor": instructor
                                    })
        return pd.DataFrame(all_data).drop_duplicates().reset_index(drop=True)
    except Exception as e:
        print(f"Error processing timetable: {str(e)}")
        sys.exit(1)

def organize_by_semester(schedule_df):
    """Organize schedule data by semester"""
    semester_data = {sem: [] for sem in SEMESTER_COURSES.keys()}
    
    for _, row in schedule_df.iterrows():
        course_base = re.search(r"([A-Z]+\s\d+)", row["Course"]).group(1)
        section = row["Course"].split('.')[-1] if '.' in row["Course"] else '0'
        
        for sem, courses in SEMESTER_COURSES.items():
            if any(course in course_base for course in courses):
                entry = {
                    "course_code": course_base,
                    "section": section,
                    "day": row["Day"],
                    "time": row["Time"],
                    "room": row["Room"],
                    "instructor": row["Instructor"]
                }
                semester_data[sem].append(entry)
                break
                
    return semester_data

# ========================
# DATABASE FUNCTIONS
# ========================

def save_to_mongodb(data):
    """Save processed data to MongoDB Atlas"""
    try:
        client = MongoClient(
            MONGO_URI,
            tls=True,
            tlsAllowInvalidCertificates=True,
            serverSelectionTimeoutMS=5000
        )
        
        # Verify connection
        client.server_info()
        
        # Database operations
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        collection.delete_many({})
        
        # Prepare documents
        documents = [{"semester": k, "courses": v} for k, v in data.items()]
        
        # Insert data
        result = collection.insert_many(documents)
        print(f"Successfully stored {len(result.inserted_ids)} semesters in MongoDB")
        
    except Exception as e:
        print(f"MongoDB Error: {str(e)}")
        print("Possible solutions:")
        print("1. Check internet connection")
        print("2. Verify MongoDB Atlas credentials")
        print("3. Whitelist IP in Atlas Network Access")
        sys.exit(1)

# ========================
# MAIN EXECUTION
# ========================

if __name__ == "__main__":
    print("=== Class Schedule Processor ===")
    
    # Step 1: Load faculty data
    print("\nLoading faculty information...")
    faculty_map = load_faculty_mapping()
    print(f"Loaded {len(faculty_map)} faculty members")
    
    # Step 2: Process timetable
    print("\nProcessing timetable data...")
    schedule_df = process_timetable(faculty_map)
    print(f"Found {len(schedule_df)} schedule entries")
    
    # Step 3: Organize by semester
    print("\nOrganizing by semester...")
    semester_data = organize_by_semester(schedule_df)
    
    # Step 4: Save to MongoDB
    print("\nSaving to MongoDB Atlas...")
    save_to_mongodb(semester_data)
    
    # Step 5: Save backup CSV
    print("\nCreating CSV backup...")
    flat_data = []
    for sem, courses in semester_data.items():
        for course in courses:
            course["semester"] = sem
            flat_data.append(course)
    pd.DataFrame(flat_data).to_csv("class_schedule_backup.csv", index=False)
    print("Backup saved as class_schedule_backup.csv")
    
    print("\nProcessing completed successfully!")
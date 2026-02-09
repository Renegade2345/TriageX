TriageX

A lightweight REST-based claim processing agent that extracts structured data from FNOL (First Notice of Loss) documents, validates required fields, applies rule-based routing, and returns an explainable decision in JSON format.

# Problem Statement
This project implements an autonomous insurance claims processing agent that:

Extracts key fields from FNOL documents (PDF/TXT)

Identifies missing or inconsistent fields

Classifies and routes claims based on business rules

Provides a short explanation for the routing decision

## Tech Stack
Node.js, 

Express.js and 

Multer (file upload handling)


### Running the Project Locally

Step 1 – Install Dependencies

npm install

Step 2 – Start the Server

npm run dev

Server runs at: http://localhost:3000

#### Testing the API

Endpoint

POST /process-claim

Request:
Content-Type: multipart/form-data

Field name: document

Supported formats: .pdf, .txt

Upload an FNOL document as the document field.


##### Running Unit Tests
Run:

npm test

Test coverage includes:

Field extraction

Validation & normalization

Routing logic

Edge-case handling


###### Output Format

{
  "extractedFields": {},
  "missingFields": [],
  "recommendedRoute": "",
  "reasoning": ""
}

extractedFields = normalized structured data

missingFields =  list of missing mandatory fields

recommendedRoute = routing decision

reasoning  = short explanation of decision


###### Future Improvements

OCR support for scanned PDFs

Confidence scoring for extraction

AI-assisted extraction fallback

Persistent storage integration

Containerized deployment


### ARA Lab Website

Website for the Assistive Robots & Accessibility (ARA) Lab at UMass Lowell

New features for this milestone (M6):

Authentication:
-User authentication using the Supabase Auth
-Protected routes and UI rendering dependent of if the user is signed in or not
-Role-based content management (auth users can add content edit/delete coming soon)

Real Time Data:
-Shows current weather for Lowell, MA in the nav bar using the Open-Meteo API
-Date and time: Real-time clock displaying current date and time
-refreshing weather data every 10 minutes

Add new projects via form:
-Upload project images (Google Drive image support)
-create project descriptions

People Page (/people):
-Display current lab members and separate alumni section
-Admin Features (when you are logged in):
    -Add new lab members mark them as active/alumni put profile images, titles, descriptions, and websites

News Page (/news):
-Recent lab news, events, and activities
-Date and location information
-Admin Features (when logged in):
    -Add news articles with event dates, locations, and images

Wiki Page (/wiki):
-Internal lab member stuff (visible only to authenticated users)
-Search functionality

Contact Page (/contact)
-Contact form for inquiries
-First name, last name, email, and message fields

Image Handling:
-Google Drive Integration: Automatically converts Google Drive share links to direct image URLs

UI/UX Features
-New CSS look (looks more friendly i guess)

To use Google Drive images:
-Upload image to Google Drive
-Set sharing on that image to "Anyone with the link can view"
-Copy the share link
-Paste into the image URL field in any form


API Routes (Currently set up with GET and POST for both)
All API routes:

GET /api/people
-Returns all people with their associated projects
POST /api/people
-Makes a new person entry

GET /api/projects
-Returns all projects
POST /api/projects
-Makes a new project entry

GET /api/news
-Returns all news articles sorted by date
POST /api/news
-Makes a new news article

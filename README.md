# final_project
MSSE661 - Final Project
<br>Phase 1 of a streamlined HR System
<br>Developer: Azeem Mufti

<br>Current Phase Implementation - Phase 1
<br>Version: 0.2 (Pre-Alpha)

<h1>Features</h1>
<br>Features Targeted for Phase 1
<br>1. Authentication - Using JWT
<br>2. Hiring a new employee from an HR perspective (specifically, gathering their personal information, setting their salary)
<br>3. Employee information management, specifically allowing employees to change their personal information such as their username, password, address, phone number and any other information that would be managed by the employee themselves.
<br>4. As an admin promote an employee to give them raises.

<h1>Problem Statement</h1>
<br>Many HR systems right now feel very scattered and poorly implemented with different facets typically sold separately or contained within a third-party tool. This means that there are so many different tools to achieve common HR functions making it hard to learn, an extreme lack of scalability as the company grows, and just in general confusing to use and develop against. This typically fuels too many negative employee experiences that might relate to their retention or general experience working at a company. Many HR personnel have complained to me about this problem and while this is an extremely large project, handling it in phases where each phase focuses on something specific will hopefully lead to the development of something tangible that we can use in the real world one day as well. The first phase of this project will help lay the groundwork for some of the fundamentals of the larger system.

<h1>TODO</h1>
<br>1. Complete authentication  -- COMPLETE
<br>2. Complete back-end programming for all features -- COMPLETE
<br>3. Complete event-triggers for feature 2/3 -- COMPLETE
<br>4. Complete database design -- COMPLETE
<br>5. Complete website layout -- COMPLETE
<br>6. Polish website -- COMPLETE
<br>   6a. Add success/error flash messages -- COMPLETE ... added error messages to user on errors
<br>7. Testing / Test Suite -- COMPLETE [Heavily reliant on backend testing.]
<br>8. Add installation guide -- COMPLETE

<h1>Installation Guide</h1>
<br>1. Create a new mysql database called 'hr_primary'
<br>2. In the backend configure the database-config.js file to make a connection to your mysql database.
<br>3. navigate to the backend directory and do an `npm install`. Once it is done do an `npm start`. Make sure the tables are created and an admin user is created.
<br>4. In a new terminal navigate to the frontend directory and do an `npm install. Once it is done do an `npm start`.
<br>5. In your web browser navigate to http://localhost:3000
<br>6. The initial user created has credentials of admin/admin. We recommend you change the password of this super user. Remember if you change this info that some of the mocha back end tests will fail. 
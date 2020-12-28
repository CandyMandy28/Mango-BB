# Mango-BB

## Setup

1. Clone this repository!
1. To set up, run the following commands:
```cmd
cd frontend
npm install
cd ..
cd backend
npm install
```
1. Make sure you have a functioning SQL server and MongoDB server, and connect them via `./backend/config/secrets.js`

For us, we had Atlas and PHP Admin running our MongoDB and SQL server respectively. We had to make sure that, for Atlas, everyone's Atlas IP addresses were added so that they had authority to run the server.

1. Once you're done, have **2** terminals open.
1. Run `npm start` in both `./frontend` and `./backend`

* The frontend runs here: http://localhost:3000
* The backend runs here: http://localhost:4000

### Issues & Solutions
If you're on windows, you may encounter this problem.
If you're having trouble getting `npm install` or `npm start` to work on `./backend`, consider these steps:
1. Remove the folder `./backend/node_modules`
2. Uninstall Node JS from your laptop via Control Panel > Programs and Features.
1. Install nvm, and make sure you install and use npm version `10.15.1`.

## TL;DR Overview
This is a project for CS 411: Database Systems.
We used a combination of NodeJS, React (Semantic UI), and Chartjs to make this project.
That includes JavaScript, HTML/CSS/JSON, MongoDB, and SQL.

## Overview of Our Project
For this project, we made an online iClicker for lectures. The reason for this is because there are many options for live polling and answering questions. However, the options provided are either tedious and require prior input or not free. Therefore, we're solving the real problem of lack of online participation and allowing teachers to do the same iClicker questions that they have done before. It has the same quick, simple setup of just setting a question name and selecting the correct answer to a question. For students, we encourage them to participate by creating a scoring system that ranks them each lecture, so every student has a chance at being #1. You get the attendance for all the students and classes. Therefore, you just get similar functionality as iClicker but it's all online. We also personalize the experience by having a login/signup function for all the teachers and students.

## The Data

Overall, we used SQL and MongoDB for our database. In these, we created tables/schemas and stored data according to what we needed.

For SQL in PHP MyAdmin, we made several tables (see ER Diagram). This was mainly used to store the information for Students, Teachers, Classes, Enrollments, Sessions, and Users. For MongoDB in Atlas, we made two schemas: Questions and Responses.

For Students, Teachers, Classes, and Enrollments, we got inspiration from the SQL schema from the Prairie Learn activities. Therefore, we knew that we needed the netID/teacherID for the teacher and students. Classes were indexed by CRNs since we know that's always unique for each class. Enrollments were dependent on Classes and Students, so we modeled it like so. Since we were also taking information for Users for the login feature since we wanted this program to be usable by UIUC in the future, we made sure that everyone had to sign in with an email and password. Hence, users, students, and teachers all had emails connected to them. Next, since we know every class will have a session and had a starting and ending time, we made sure that Sessions had this in there.

When it came to Sessions, Questions, and Responses, we wanted it so that every question and response corresponded to a given session. We also knew we wanted each session to have a start and end. Questions had to be put out at a certain time, and we wanted a score for each response that is answered within a certain amount of time. Therefore, we made sure to include the times so that we can easily calculate the scores.

// insert ER Diagram and Schemas

*Briefly discuss where you collected data and how you did it*

We manually collected the data for the project in different ways throughout the project. In the beginning, we inputted data through PHP MyAdmin to set up the database and to have some data there. After setting up the database, we used Postman to send post/put/get requests while creating the backend in order to make sure the backend was functioning properly. Then while connecting the backend and frontend together, we inputted data in order to test the overall functionality of the project. 

### SQL vs. NoSQL
*Discuss how you used a NoSQL database in your project*

We used the NoSQL database MongoDB for our project. We decided to use MongoDB for storing questions and responses we received from the teacher and student accounts. Since each piece of data had a variable length, we saw this as an opportunity to move away from SQL’s limit on character (VARCHAR) and decided to use Mongodb’s String schema instead. 

*Discuss your design decisions related to storing your app data in relational vs. non-relational databases.*

Some design decisions that motivated us to go for SQL was if the data we were entering in the database needed to talk to other tables in the database. Since join is hard to perform on Mongodb, we decided to keep all the tables that had relationships with each other in SQL for the ease of inter-table communications. We decided to use MongoDB to store questions and responses because each question is different and they can be of variable length. Storing this data on the SQL server would be hard to read and schema wouldn’t be of any use as it is hard to set an upper limit on the question. That is why we kept the Mongodb schema string to store the responses and questions.

## Functionality
### Main Features
1. We have two different UI for teachers and students. 
1. Home Page
    1. Sign Up/Login: Teachers and students can both sign up or log in to their accounts and their data will get updated in the database.
1. Profile Page
    1. View Profile: view their email, netid, and account type(teacher/student)
    1. Change Name: Users are able to change their names on the profile page.
1. Attendance: We calculate the attendance of students based on if they answer questions during the session. The student must answer at least one question in each session to be marked present for that session.
1. Live polling/students ranking: After students put in their answers, the teacher and students will see the students’ results on a live histogram chart as well as a list of top 5 students (and your ranking from the student side).

### Teachers Features
1. Course Page
    1. Add Course: Teachers are able to add a course that they teach on the Course Page. Once students join the class, the student number(total number of students) will be updated on the teacher course page.
    1. Within a course:
        1. Attendance: The teacher will be shown the entire roster of students in the class and whether they were present or absent during the corresponding session
        1. Sessions
            1. Start Session: Teachers can start a session when they have a question for students.
            1. Ask A Question: By clicking on the Question button, teachers can put in the question and correct answer and submit. 
                1. Live Polling (See in Main Features)
                1. View All Questions: Teachers can view all the questions they have asked in the session by clicking on the "view all questions" button.
            1. End Session: Once the class is over, teachers can end the session by clicking on the end session button.

### Student Features
1. Search Page
    1. Add Course: Students are able to add a course.
    1. Delete Course: Students can unenroll from a course.
1. Course Page
    1. Answer Question: Once teachers ask a question, a "Question" button will be shown and it will lead students to a modal where they can see the question and choose an answer.
        1. Live Polling (See in Main Features)
        1. Your Score/ranking: Students are able to see their scores and ranking as teachers post more questions.

### Basic Function
*Explain one basic function*

**SQL Basic Function:** This function helps us retrieve a student's enrollment data. Here, we check to see if a particular student is a part of a particular course, and if they are then we can fetch their attendance data for that class. We use the student’s netid and the course’s crn to match any enrollment entries that contain both pieces of information. 

```js
let sql_query = `SELECT * FROM Enrollments NATURAL JOIN Classes WHERE netID = '${req.params.netID}' and crn = ${req.params.crn}`;
db.query(sql_query, (err, result) => {
    if (err) throw err;
    res.json({ data: result });
});
```

```js
router.route('/responses/scores/:sessionid')
    .get(async function (req, res) {
        try {
            let response = await responseModel.aggregate([
                {$match: {sessionID: parseInt(req.params.sessionid)}},
                {$group: {_id: '$netID', totalscore: {$sum: "$score"}}},
                {$project: {_id: 0, netID: '$_id', totalscore: 1}},
                {$sort: { totalscore : -1}}
            ]);

            res.send({message: "OK", data: response});
        } catch (err) {
            res.status(404).send({message: "Error", data: err})
        }
    });
```

*List and briefly explain the dataflow, i.e. the steps that occur between a user entering the data on the screen and the output that occurs*

**Dataflow Setup:** The way we have set up our codebase is that we have two servers running; one running frontend and the other running backend. When the user makes any action, a function gets triggered on the client-side, which then makes a respective API call to the backend. We have more than 25 different API endpoints for different functions/queries we might need through the application. The client hits any of that API endpoint and then the backend makes a call to either the SQL or NoSQL (MongoDB) database and does the respective action. Then, we return any data that needs to be sent back and close the connection. On the frontend, we parse the data retrieved from API and use it to display it for the user. 

### Advanced Function
*Explain your advanced function 1 (AF1) and why it's considered as advanced. Being able to do it is very important both in the report and final presentation.*

One advanced function that we made was the Live Polling for the question responses. The reason it's considered advanced is that it uses more advanced queries while also implementing that data in a different way from what we have done before in the rest of the project. It's the most notable different feature in the entire project.

For the queries, we were connecting the responses and questions with the live session. Therefore, we were combining the SQL and MongoDB databases to get the corresponding data so that we were able to show the correct responses and questions in a live session. In addition to that, the query to get the polling from just responses involved aggregating, matching, sorting, and grouping. This would count as a more advanced query as opposed to just doing find and matching.

For the front end, we had to figure out how to display a live graph, which was completely different from our typical UI of just buttons and containers. Therefore, this feature was different and more difficult than our previous functions.

## Technical Challenge
*Describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project.*

The biggest challenge we faced was the Attendance feature. For this, we had to 
    1. figure out to do a combined query with SQL and MongoDB in a logical manner and 
    2. figure out how we want to write out the algorithm synchronously and parse the output that is easier to read on the frontend.

First off, it was difficult trying to get all the data to be processed at the same time. Normally with one query call, you could just do one function and return the data when it comes in. However, with MongoDB, we were working with asynchronous functions and also working with other data. Therefore, we ran into a lot of issues where the data is null because the queries did not finish running. We later learned that we can just force these asynchronous queries to run in sequence. We did this by doing the query and then following this function with `.then()`.

For the output, we weren't sure about how we should have sent back the results. For the teacher roster, we would have to somehow make sure that we return the map of students with their attendance for each session. Since we wanted to display this data in a table on the frontend, we group each student’s netid and attendance by sessions in a single object and sent an array of objects back to the frontend. We had to check Responses, Questions, and Sessions for this attendance information. In addition, we had to be consistent with our returned results so that it was parsable on the front end.

## Things that went according to the plan (and not)
*State if everything went according to the initial development plan and proposed specifications, if not - why*

While everything went according to plan, we did have to make a few minor design changes while we were implementing the project. For example, we decided that it would be clearer for teachers if we added a “Start/End Session” button.

## Division of Labor
*Describe the final division of labor and how did you manage teamwork.*

### Management
Our main forms of communication were: Google Docs, group chats, and synchronous meetings.

For group chats, we had several group chats (411 Discord, Discord group chat, Messenger), but we mainly talked in our Messenger group chat. In here, we made sure to send reminders of future meetings and connect with each other quickly.

For Google Doc, we shared a google folder for the initial setup and brainstorming for everything. Afterward, we had a single document that contained all the necessary information (useful links, information, major meeting notes, and everyone's tasks).

For synchronous meetings, we connected after class in 411 and also outside of class on other days. Here, we went over the agendas and tasks we all have to complete. We also used this to hold everyone accountable because we also used this time as working time so that we all could do live pair coding, which is more helpful than just texts and images. That is the biggest contributor to our success and completion of this project.

### Amanda Wang
At the beginning of the project, I helped brainstorm the UI and how everything would function and work. During meetings, I made sure to keep all the documents updated so that everyone had access to the latest information. I mainly worked on the backend for the beginning of the coding portion of the project. I mainly pair-coded with Parth for a lot of the backend during our meetings. I set up the SQL database, and I felt that I kept things organized and in line during the meetings while still allowing room to build rapport. After the backend was mostly finished, I worked on the front end. There, I did the question modals on the student side, the live polling view, and student rankings. I also added the Question button on the course page. I also pair-coded with the group and fixed a lot of bugs and backend issues that came up along the way.

### Angela Jaw
I mostly worked on connecting the backend and the frontend together as well as setting up the UI according to the designs we came up with. Mostly, I helped where I could typically either by doing the tasks assigned to me during our group meetings (brainstorming ideas, creating pages/components, connecting backend and frontend, running things on Postman to make sure things are working as expected, etc) or by staying on the call with a teammate and helping them with their task(s) by giving suggestions/advice or to give them moral support. For example, Amanda and I were on the call together while she set up the SQL database on PHP MyAdmin. Other than that, in the earlier stages of the project, I helped come up with and brainstorm the designs and functionality of the project as well as edited/created the project pages on the course wiki.

### Jiahua He
In the beginning stage of the project, I helped brainstorm by designing the UI for different pages and what useful functionality we could have. I made sure in the designed UIs we had all the features that we brainstormed. In the implementing stage of the project, I mainly worked on connecting the frontend and backend content together. Meanwhile,  by working with group members, I also worked on the frontend by setting up UI based on what we planned and adding/changing different features while implementing to allow users to have good UX. During group meetings, we had pair coding sessions with team members and helped each other by running on postman and PHP myAdmin to check or test if everything was working and showing the correct output.

### Parth Patel
During the planning stage, brainstormed on what tech stack to use for the project along with coming up with UI layouts. Worked on setting up the codebase structure for both backend and frontend. Established connection between the UI and the backend via API calls, along with the backend to the databases (SQL and NoSQL). For the frontend, I worked on setting up the student's courses page, attendance modals, and profile page. Worked with Amanda on coming with various API endpoints requested by Angela and Lily that had difficulty levels varying from basic to very complex like attendance and live polling. Helped Angela and Lily along the way with any issues they encountered with using react or parsing the data we sent back from the database. 

## Application Design Practice (15 min)

For the below exercises, you will practice thinking about schemas and design for different applications. 

For each exercise, write out your schema on paper or in a google doc. Ping a TA for review when you are done! 

When designing SQL schemas, for each table, write the column name and type. Denoting foreign keys can also be helpful! 

When designing NoSQL schemas (aka Mongo), you can write your models in javascript. Ex: `Teachers: [{name: "Cindy", Rating: 5}, {Name: David, Rating: 4.5}]` 

---

### Warmup: IMDB (10 min)

<b> Task: Design the tables/documents related to Movies, Actors, Directors, Studios, Casts in IMDB. </b>

<i>Clone IMDB</i>

- Movies have `casts`, `genres`, `studio`, `details`, `release date`
- `Actors`/`Directors`/`Studio` have `details`
- All entities are related 
- Need to view all `studio` `movies`
- Need to view all `movies` an `actor` was in

Key pages: 
- Movie Page: View `cast`, `genre`, `studio`, `details` of a `movie` 
- Actor Page: Show all `movies` an `actor` was in 
- Studio Page: View all `movies` by `studio` 
- Homepage: Show the most frequently searched `movies` in the last X days. 

### Amazon Customer Reviews

<b> Task: Design the tables/documents related to the following: Products, Reviews, Customers, Ratings/Stars & Comments. </b>

Notice the following characteristics about reviews on Amazon: 

- Each Product has Reviews and an average Rating (average of Stars)
- Each Review has a Number of Stars & Comments
- A customer page shows all reviews and comments for a single reviewer 

Key pages:
[Product page](https://www.amazon.com/VIZ-PRO-Magnetic-Circular-Whiteboard-Erasers/dp/B07142X292/ref=pd_rhf_se_s_cp_0_7?_encoding=UTF8&pd_rd_i=B07142X292&pd_rd_r=GGD51JB59HQ46HNY68MY&pd_rd_w=aNU4G&pd_rd_wg=cNApv&psc=1&refRID=GGD51JB59HQ46HNY68MY)
| [Custom page](https://www.amazon.com/gp/profile/amzn1.account.AG2AJ675JOFBWW6PXAOP5OHOJXUA/ref=cm_cr_srp_d_pdp?ie=UTF8)


### Team Calendar (20 min)

Implement a calendaring app for people working in teams.

Below are your core features.

<b> Task: Answer the following questions for each stage </b>

- What is your db schema? 
- What are your routes? What does each route read from or write to database?
- Bonus: Can you design in this with both a SQL and NoSQL implementation?

*If you are not familiar with calendaring apps, take a look at google calendar! It's important to understand how these features work before trying to tackle this problem*

#### Stage 1: One team

- Every user belongs to the same team
- Everyone can see each others' calendars
- A calendar event consists of a organizer, attendees, a time and a description. Each event is a one-time event. 

#### Stage 2: Multiple teams

- Each person belongs to a single team
- Each team has a team admin that can add more people to the team
- Calendars are only visible to people on the same team.
- Calendar events follow the rules as in stage 1. 

#### Stage 3: Recurring events

- Expand on stage 2. How would you implement recurring events?


### Online Quiz Generator (25 min)

<i>Online Quiz</i>

Mrs. Besson, a high school History teacher has an idea for a startup. She's hiring you as a consultant to tell her if her idea is feasible. 

Idea: onlinequizgenerator.com

Premise: This is a hypothetical service that teachers go to create quizzes for their class. The app is designed so that only teachers have to ever log on. 

App Flow:
 
- Teacher signs up and loads his/her quiz dashboard
- The Quiz Dashboard shows all quizzes and their current state.
	- A quiz can be complete (students have completed it)
	- A quiz can be inactive (teacher has not sent it to students)
	- A quiz can be active (quiz has been sent)
- Create a Quiz 
	- A quiz can have multiple choice and short answer questions
	- A quiz can have unlimited questions 
	- A quiz can have time limit per question 
	- A quiz can have a deadline 
	- Once a quiz is sent to a student, it cannot be edited. 
- Send Quiz to students (upload their emails and names)
	- Students do not have to register for the site. They recieve a unique link, that can only be opened 1 time. They take the quiz upon opening the quiz. 
- Grading
	- All multiple choice questions get graded by the computer 
	- The teacher logs back into his/her account to grade the short answer questions.  
- Once quizzes are graded, the scores are emailed to students 
- Teachers can always revisit results of a single quiz by clicking on a Quiz in the Quiz Dashboard


<b> Task </b>

Design the schema for this application. 

Here are a few questions you must also be ready to answer: 

- How will you represent students in your database? 
- What if two teachers send the same student different quizzes?
- When will the computer grade multiple choice questions?
- How will you make sure a quiz is only opened 1x for a single student? 
- How could you email the teacher a notification when all students have submitted a certain quiz?


<b> Bonus </b>

- How would you make a quiz with a live timer? What would happen if someone refreshed the page? 












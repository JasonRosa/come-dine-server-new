
 
# Come Dine
 
 
 
 
 
<br>
 
 
 
## Description
 
Come Dine is an MERN full stack application where people of all ages can find local dinner parties, ask to join, and meet new people in the process. 
 
 
 
<br>
 
## User Stories
 
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage and filter by type of industry, business, etc.,log in, sign up and view my matches.
- **sign up** - As a user I want to sign up on the web page easily so that I can view and add potential matches to my list.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **edit user profile** - As a user I want to be able to edit my profile.
- **profile page** - As a user I want a nice, functional profile page that will have my information and include a feed of contacts and potential business opportunities.
- **party search page** - As a user I want a page with a search feature and filter that I can use to view potential dinner parties to attend and their key information.
- **party search result page** - As a user I want to see the list of profiles with key information based on filters by my preferences and see all potential local matches.
-  **recipe search page** - As a user I want a page with a search feature and filter that I can use to view recipes based on specific search keywords.
- **recipe search result page** - As a user I want to see the list of recipes with key information based on filters by my preferences and see all results.
- **Request to join page** - As a user I want to be able to ask to join dinner parties.
- **Request sent page** - As a user I want to know that my request has been sent.
- **chat feature page** - As a user I want a page where I can chat with other users once I am apart of a dinner party.
 
<br>
 
 
 
## Server Routes (Front-end):
 
 
 
| **Method** | **Route**                          | **Description**  | **Validation**                                    | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET` FRONT     | `/` | Main page route.  Renders home `index` view. |             
|  
| `GET`  FRONT    | `/home` | Second main page route.  Renders the main `home` view.  |
|                                                        
|                                                                               
| `POST`  FRONT    | `/login`| Sends Login form data to the server.                         | { email, password } |                                    
|
| `GET`   FRONT    | `/signup`| Renders `signup` form view.      |                              
| 
| `POST`  FRONT     | `/create-profile`  |  Take the created profile and connect to the profile page. |   user only <PrivateRoute>                                                    |     
| 
| `DELETE`  FRONT  | `/delete-profile`|  Deletes the existing user from the database. |                        user only <PrivateRoute>                                  |
|
| `POST`  FRONT     | `/search`  |  User can input into the search box and send their queries to render filtered through either recipes or parties. |                                 |
|
| `POST`  FRONT     | `/chat/create/:otherUserId`| Renders page where user can create a chat with another user.|
|
| `GET`   FRONT    | `/chat/:chatId` | Users can enter that chat that was created.| 
|
| `POST`  FRONT    | `/chat/:chatId/message`| Renders the page where the user's name who sent the message appears. |
|
| `GET`   FRONT    | `/chat/:requestId` | Users has created a request to receive  response to join a dinner party.| 

## Server Routes (Back-end):

| `GET` BACK     | `/login` | Renders `login` authentication.     | 
| `GET` BACK    | `/verify` | authenticates user
|
| `POST`   BACK   | `/request/create/:otherUserId`| creates a new request id using the id of the author|
| `POST`  BACK   | `/signup`| Sends Sign Up info to the server and creates a user in the DB. | {  email, password, location  }           |                                               
|
| `PUT`  BACK    | `/edit-profile`  | Authenticates and sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [city] [imageUrl] } | user only <PrivateRoute>


 
## Models (Back-end):
 
User Model
 
````javascript

{
    username: { type: String, required: true, unique: true } 
    email: { type: String, required: true }
    password: { type: String, required: true}
    firstName: String,
    lastName: String,
    contact: String,
    city: { type: String, required: true }
    host: Boolean,
    imgUrl: String,
    description: String,
    
 
 }

 Messages Model
	
 ````javascript
 

 {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      content: String,
    }
 
 
   
 Conversation Model
 
````javascript
 
 {  participants: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }],
      messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
      }]
  }
 
 Request Model
	
 ````javascript
 

 {
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      bringWhat: String,
      inviteMe: Boolean
      content: String,
    }
 
 Party Model

 ````javascript

 {
     author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      title: { String, Boolean },
      location: { type: String, required: true}
      description: { String, Boolean },
      theme: String,
 }

  Recipe Model

 ````javascript

 {
     
      cuisine: { String, Boolean },
      ingredients: { String, Boolean },
      theme: String,
 }
 
<br>
 
## API's

 - edamam (https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=b1758dd2&app_key=e46a90d821852a15be725bd84047e924)
 
<br>
 
 
## Packages
 
- **npm**
- **ironlauncher**
 
<br>
 
 
 
## Backlog/Wireframes
 
[See the Figma working board.]
(https://www.figma.com/file/F7bSrOhH4wGqTvRIL53cUV/Untitled?node-id=2%3A7)

[See the Figma prototype viewer.]
(https://www.figma.com/proto/F7bSrOhH4wGqTvRIL53cUV/Untitled?node-id=2%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=2%3A2)
 
<br>
 
 
 
## Links
 
 
 
### Git
 
The url to our repository and to our deployed project
 
[Repository Link Server](https://github.com/JasonRosa/come-dine-project-3-server)
[Repository Link Client](https://github.com/JasonRosa/come-dine-project-3-client)
 
[Deploy Link]()
 
 
 
<br>
 
 
 
### Slides
 
The url to your presentation slides
 
[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)
 
### Contributors
 
 
Jason Rosa - [`<github-username>`](https://github.com/JasonRosa) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/jason-cristiano-da-rosa-346660a5/)
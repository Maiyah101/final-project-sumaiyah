# MEDP33100 - Final Project: Public Archive

## Live Demo

-https://final-project-sumaiyah.onrender.com
## Project Overview

- Zoomie Zone is an anonymous public archive where people can upload funny or cute pictures of their pets, add captions, and interact with posts through likes and comments. The project was designed to create a fun and engaging online space where strangers can share silly pet moments without needing to create accounts or provide personal information.
## Endpoints

- GET /entries
Returns all pet posts from the database.
POST /entries
Creates a new pet post with:
uploaded image
caption
tag/category
GET /entries/:id
Returns a single pet post using its MongoDB ID.
PUT /entries/:id/like
Updates the like count for a specific post.
POST /entries/:id/comments
Adds an anonymous comment to a specific post.
DELETE /entries/:id
Deletes a specific pet post.

## Technologies Used
- Languages
HTML
CSS
JavaScript
Node.js
Libraries / Frameworks
Express.js
MongoDB
Mongoose
Multer
Handlebars (hbs)
Other Tools
MongoDB Atlas
Render
GitHub
GitHub Desktop
Visual Studio Code
## Credits

- Third-Party Resources
Paw print emojis used for decorative design elements
MongoDB Atlas documentation for database setup
Express.js documentation
Multer documentation for image upload handling
Help / References
Class lectures and starter code provided in MEDP33100
ChatGPT/OpenAI was used for debugging assistance, API troubleshooting,help with render issues, and explaining backend concepts
Siddique Baksh, Senior Software Engineer, helped provide guidance,technical advice during development,styling help,and also helped with debugging
## Future Enhancements

- If given more time, I would like to add:
image upload previews before posting
custom reactions besides likes
better mobile responsiveness
sorting posts by newest or most liked
search functionality for captions or tags
moderation tools for inappropriate posts
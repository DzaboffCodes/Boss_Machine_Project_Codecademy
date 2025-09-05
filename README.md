# Boss Machine API

A full-stack web application with a RESTful API for managing minions, ideas, meetings, and work assignments.

## 🚀 Features

- **Minions Management**: CRUD operations for minion employees
- **Ideas Tracking**: Million-dollar idea validation and management
- **Meetings**: Auto-generated meeting scheduling
- **Work Assignments**: Nested resource management for minion work items
- **Custom Middleware**: Million-dollar idea validation
- **Frontend Integration**: React/Redux frontend with API integration

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React, Redux, Webpack
- **Database**: In-memory JavaScript objects
- **Testing**: Mocha test suite

## 📁 Project Structure

```
boss-machine-start/
├── server/
│   ├── routes/
│   │   ├── minions.js
│   │   ├── ideas.js
│   │   ├── meetings.js
│   │   └── work.js
│   ├── api.js
│   ├── db.js
│   └── checkMillionDollarIdea.js
├── browser/
├── public/
├── app.js
└── main.js
```

## 🔧 Installation & Setup

```bash
npm install
npm run build
npm start
```

## 📊 API Endpoints

### Minions
- `GET /api/minions` - Get all minions
- `POST /api/minions` - Create new minion
- `GET /api/minions/:id` - Get minion by ID
- `PUT /api/minions/:id` - Update minion
- `DELETE /api/minions/:id` - Delete minion

### Ideas
- `GET /api/ideas` - Get all ideas
- `POST /api/ideas` - Create new idea (with million-dollar validation)
- `GET /api/ideas/:id` - Get idea by ID
- `PUT /api/ideas/:id` - Update idea (with validation)
- `DELETE /api/ideas/:id` - Delete idea

### Meetings
- `GET /api/meetings` - Get all meetings
- `POST /api/meetings` - Generate new meeting
- `DELETE /api/meetings` - Delete all meetings

### Work (Nested Resource)
- `GET /api/minions/:minionId/work` - Get work for specific minion
- `POST /api/minions/:minionId/work` - Create work for minion
- `PUT /api/minions/:minionId/work/:workId` - Update work item
- `DELETE /api/minions/:minionId/work/:workId` - Delete work item

## 🧠 Key Learning Outcomes

- **RESTful API Design**: Implemented standard REST conventions
- **Express.js Middleware**: Custom validation middleware for business logic
- **Error Handling**: Proper HTTP status codes and error responses
- **Nested Resources**: Complex routing with parent-child relationships
- **Data Validation**: Type checking and conversion for API inputs
- **Modular Architecture**: Separated concerns with organized file structure

## 🎯 Challenges Solved

1. **Custom Middleware**: Built `checkMillionDollarIdea` to validate business rules
2. **Nested Routing**: Implemented work assignments as a nested resource under minions
3. **Type Safety**: Handled string-to-number conversions for client data
4. **Database Relationships**: Managed relationships between minions and their work

## 🔍 What I Learned

- Express.js routing and middleware patterns
- RESTful API best practices
- Error handling and status code management
- Frontend-backend integration with CORS
- Modular code organization for scalability


*This project was built as part of learning full-stack web development, focusing on backend API design and Express.js fundamentals.*

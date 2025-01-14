# Simple Facemask Detection Project

This project is a facemask detection system that consists of a frontend built with React (or another framework) and a backend built with Python. The frontend allows users to interact with the system, while the backend handles the detection logic.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for running the frontend)
- [Python](https://www.python.org/) (for running the backend)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)

---

## Installation and Setup

### 1. Clone the Repository

First, clone this repository to your local machine:

`git clone https://github.com/Sn0wman8/Simple-Facemask-Detection.git`

### 2. Set Up the Frontend

1. Navigate to the facemask folder:

`cd facemask`

2. Install the required npm packages:

`npm install`

### 3. Set Up the Backend

1. Open a new terminal window and navigate to the `backend` folder:

`cd backend`

2. Install the required Python packages

`pip install -r requirements.txt`

3. Run the backend server:

`python app.py`

### 4. Launch the Frontend

1. In the original terminal window (where you installed the frontend dependencies), navigate back to the `facemask` folder if you're not already there:

`cd ../facemask`

2. Start the frontend development server:

`npm run start`

## Project Structure
```
Simple-Facemask-Detection/
├── facemask/            # Frontend code
│   ├── public/          # Static assets
│   ├── src/             # React components and logic
│   ├── package.json     # Frontend dependencies
│   └── ...
├── backend/             # Backend code
│   ├── app.py           # Backend server script
│   ├── requirements.txt # Python dependencies
│   └── ...
└── README.md            # Project documentation
```


## Acknowledgments
- [React](https://reactjs.org/) for the frontend framework.

- [Python](https://www.python.org/) for the backend logic.

- [npm](https://www.npmjs.com/) for managing frontend dependencies.

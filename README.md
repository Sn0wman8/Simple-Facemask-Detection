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

## Screenshots
- ### User Interface
![image](https://github.com/user-attachments/assets/220a3846-a3ff-4490-9100-6eefcc75c269)
- ### Facemask Detected
![image](https://github.com/user-attachments/assets/a0bfbec7-1ee7-48f9-815a-63e2f1646110)
- ### No Facemask Detected
![image](https://github.com/user-attachments/assets/72234c68-3ba3-48d7-90a4-0cbef3be5f1d)



## Project Structure
```
facemask/
├── backend/                          # Backend files
│   ├── app.py                        # Backend server script
│   ├── facemask_detection_model.h5   # Pre-trained model for facemask detection
|   ├── uploads                       # Temporarily store image 
│   └── requirements.txt              # Python dependencies for the backend
│
├── build/                            # Production build files (generated by `npm run build`)
├── node_modules/                     # Node.js dependencies (generated by `npm install`)
├── src/                              # Source code for the frontend
│   ├── assets/                       # Additional static assets
│       └── bg1.jpg                   # Background image
├── components/                       # React components
│   └── ImageClassifier.jsx           # Component for image classification
├── App.css                           # Styles for the App component
├── App.js                            # Main React application logic
├── App.test.js                       # Tests for the App component
├── index.css                         # Global styles
├── index.js                          # Entry point for the React app
├── setupTests.js                     # Configuration for testing
├── .gitignore                        # Specifies files to ignore in Git
├── package-lock.json                 # Auto-generated file for npm dependencies
├── package.json                      # Frontend dependencies and scripts
├── postcss.config.js                 # Configuration for PostCSS
├── README.md                         # Project documentation
└── tailwind.config.js                # Configuration for Tailwind CSS

```

## Credits
- [Chau Hong Feng](https://github.com/hfchau1126)
- [Koay Jing Yuan](https://github.com/KJingY)
- [Marcus Tan Tung Chean](https://github.com/Sn0wman8)

## Acknowledgments
- [React](https://reactjs.org/) for the frontend framework.

- [Python](https://www.python.org/) for the backend logic.

- [npm](https://www.npmjs.com/) for managing frontend dependencies.

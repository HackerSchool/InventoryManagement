# HS-Inventory

This project aims to create a platform to manage the inventory of HackerSchool tools and items,
as well as allow members to request said tools and items.

## Installation

1. Clone the project to your local machine.
2. In the project root directory run `npm i`.
3. Edit database credentials in `backend/.env` (copy the contents from `backend/.env.example` if it doesn't exist)
4. If running on a new database installation, run `npm run migrate` in the `backend` directory.

### Run in development

To run the application in development mode, you have to execute the following commands:

1. In the `backend` directory, run `npm run dev`.
2. In the `frontend` directory, run `npm run serve`.

### Run in production mode

To run the application in production mode, you have to first build the frontend and then
start the backend server, as follows:

1. In the `frontend` directory, run `npm run build`.
2. In the `backend` directory, run `npm run start`.

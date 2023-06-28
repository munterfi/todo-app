# Todo App

The Todo App is a simple application for managing and organizing tasks. It allows users to create, update, and delete
tasks, as well as sort and filter them based on different criteria.

## Open tasks

- Write documentation into this README: Short summary of the app, how to, development and testing.
- Change and limit importance input to the range of 1 to 5. Also display it as clickable symbols (↯) in the edit and
  create view.
- Make design responsive, choose mobile first approach, set default design to vertical.
- Add overall base layout with header (app title and date), content and footer (copyright note and
  version) for a vertical mobile design.
- Add content layout for create and update site.
- Apply uniform CSS styling for all sites.
- Add two tests: Unit test and integration test.
- *Optional, if time*:
    - Refactor JS code, extract some functions to make program flow more clear.
    - Style 404 page.
    - Hide delete button by default, add a checkbox to enable the delete functionality besides the "Filter Completed /
      Show All" button.
    - Add some statistics to the app header: Total open todos vs. total completed. Could also be a chart (bar, pie or
      color the header like a loading bar, or very fancy: Add a timeline plot with all upcoming todos on the x-axis and
      the priority on the y-axis with the current date as vertical line.)
- Finally, make repository public and submit assignment.

## Features

- Create new tasks with a title, due date, importance level, and description.
- Update existing tasks by editing their title, due date, importance level, and description.
- Mark tasks as completed or open.
- Delete tasks permanently.
- Sort tasks by title, due date, creation date, or importance.
- Filter tasks to show only open tasks or show all tasks.
- Toggle between dark mode and bright mode for better user experience.

## Development

### Setup

1. Fork the repository and clone it to your local machine.
2. Install the required dependencies using the command `npm install`.
3. Define the port and hostname, then start the app by running the command `npm start`.
4. Access the app in your browser at `http://${hostname}:${port}/todos`.

### Testing

- Make sure the required dependencies are installed using the command npm install.
- Run the command `npm test` to execute the tests.
- Check the test results to ensure all the tests pass successfully.

DESCRIPTION OF TEST SETUP HERE; WHAT ARE THEY TESTING; HOW TO RUN THEM?

## License

The Todo App is released under the MIT License. See the LICENSE file for more details.

The project start from a template provided in the course *Web Engineering 2* of MAS Software Engineering (2022-24) at
the OST.

const inquirer = require("inquirer");
const db = require("./config")
let employeeId;

function mainMenu() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      let sql = "";
      switch (answers.choice) {
        case "View All Employees":
        db.viewAllEmployees()
          // mainMenu();

          break;

        case "View All Roles":
          sql = "SELECT * FROM roles";

          pool.query(sql, (err, result) => {
            if (err) {
              return;
            }

            console.table(result.rows);
          });

          break;

        case "Update Employee Role":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter the employee id:",
                name: "employeeId",
              },
              {
                type: "input",
                message: "Enter the new role id:",
                name: "roleId",
              },
            ])
            .then((answers) => {
              employeeId = answers.employeeId;
              sql = "UPDATE employees SET employee_name = $1 WHERE id = $2";
              const params = [answers.roleId, employeeId];
              console.log(params);

              pool.query(sql, params, (err, result) => {
                if (err) {
                  console.log({ error: err.message });
                } else if (!result.rowCount) {
                  console.log({
                    message: "Employee not found",
                  });
                } else {
                  console.log("Employee Updated!");
                }
                mainMenu();
              });
            });

          break;

        case "Add Employee":
          return inquirer.prompt([
              {
                type: "input",
                message: "What is the first name of Employee?",
                name: "first_name",
              },
              {
                type: "input",
                message: "What is the last name of Employee?",
                name: "last_name",
              },
              {
                type: "input",
                message: "What is the role id of Employee?(1,2,3,4)",
                name: "role_id",
              },
            ])
            .then((answers) => {
              console.log(answers)
              db.addNewEmployee(answers)
            })
          // break;

        case "Add Role":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter the role title:",
                name: "title",
              },
              {
                type: "input",
                message: "Enter the role salary:",
                name: "salary",
              },
              {
                type: "input",
                message: "Enter the department id:",
                name: "department_id",
              },
            ])
            .then((answers) => {
              console.log(answers)
              db.addNewRole(answers)
            });
            mainMenu();
          break;

        case "View All Departments":
          sql = "SELECT * FROM department";

          pool.query(sql, (err, result) => {
            if (err) {
              return;
            }
            console.log(result.rows);
            console.table(result.rows);
          });

          break;

        case "Add Department":
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter the name of department:",
                name: "department",
              },
            ])
            .then((answers) => {
              sql = `INSERT INTO department (name) VALUES ($1, $2, $3)`;

              pool.query(sql, [answers.name], (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log("Department Added!");
                mainMenu();
              });
            });
          break;

        case "Quit":
          console.log("Thank you, Goodbye!");
          process.exit();
      }
      mainMenu();
    })
    .then(() => {
      console.log("Main Menu");
    });
}

mainMenu();

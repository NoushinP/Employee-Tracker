const inquirer = require("inquirer");
const { Pool } = require("pg");

let employeeId;

const pool = new Pool(
  {
    host: "localhost",
    user: "postgres",
    password: "Password1",
    host: "localhost",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

pool.connect();

function mainMenu() {
  inquirer
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
          // sql statement to display employees
          sql = "SELECT * FROM employees";

          pool.query(sql, (err, result) => {
            if (err) {
              return;
            }
            console.log(result.rows);
            console.table(result.rows);
          });
          mainMenu();

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
          inquirer.prompt([
            {
              type: "input",
              message: "Enter the employee id:",
              name: "employeeId",
            },
            {
              type: "input",
              message: "Enter the new role id:",
              name: "roleId",
            }
          ]).then((answers) =>{
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

          })

          break;

        case "Add Employee":
          inquirer
            .prompt([
              {
                type: "input",
                message: "What is the first name of Employee?",
                name: "employee",
              },
            ])
            .then((answers) => {
              sql = `INSERT INTO employees (first_name) VALUES ($1)`;

              pool.query(sql, [answers.employee], (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log("Employee Added!");
              });
            });
          break;

        case "Add Role":
          inquirer.prompt([
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
              name: "departmentId",
            },
          ]).then((answers) => {
            sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
      
            pool.query(sql, [answers.title, answers.salary, answers.departmentId], (err, result) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("Role Added!");
              mainMenu();
            });
          });
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
          break;

        case "Quit":
          console.log("Thank you, Goodbye!")
          process.exit();
        }
        mainMenu();
    })
    .then(() => {
      console.log("Main Menu");
    });
}


mainMenu();
const { Pool } = require("pg");

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

const db = {
    connection: pool.connect(),

    query: "",

    viewAllEmployees: () => {
        // sql statement to display employees
        sql = "SELECT * FROM employees";
        console.log(this)

        pool.query(sql, (err, result) => {
          if (err) {
            return;
          }
          console.log(result.rows);
          console.table(result.rows);
        })
    },

    addNewEmployee: (newEmployee) => {
        sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)`;
        // console.log(db,pool)
              pool.query(sql, [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id], (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log("Employee Added!");
              });
    },

    addNewRole: (newRole) => {
        sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;

        pool.query(
          sql,
          [newRole.title, newRole.salary, newRole.department_id],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Role Added!");
          }
        )
    }
}

module.exports = db


SELECT employees.employee_name AS employee
FROM reviews
LEFT JOIN employees
ON reviews.employee_id = employees.id
ORDER BY employees.employee_name;


SELECT roles.roles_id AS roles
FROM reviews
LEFT JOIN roles
ON reviews.roles_id = roles_id
ORDER BY roles.roles_id;
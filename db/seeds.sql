
INSERT INTO employees (first_name, last_name, role_id, manager_id)  

VALUES ('Alex', 'Smith', 1, 2),
       ('Emily', 'Turner', 2, 3),
       ('Nikki', 'Nazari', 3, 4),
       ('Emma', 'Nazari', 4, 5),
       ('Roham', 'Rider', 5, 6);



INSERT INTO roles (title, salary, department_id) 
VALUES 
 ('Sales Lead', 100000, 1),
 ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
('manager', 80.00, 1);


INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
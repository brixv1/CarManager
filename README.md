
# How to run local:

In the Client folder go into the .env and change the VITE_SERVER_PORT to an open Port of your choice.

In the Server folder go into the index.js and change the ServerPort variable to the same Port. Change the MySQL Connection settings to your own.

In the Server folder run "npm i" and then "npm run dev" to start the Server.

Open a new Terminal and do the same in the Client folder.

# SQL code to create the Tables + Sample Data:
``` sql
CREATE TABLE cars (
  Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Brand VARCHAR(45) NOT NULL,
  Name VARCHAR(45) NOT NULL,
  Fuel VARCHAR(45) NOT NULL,
  Employee VARCHAR(45) NOT NULL,
  Tüv DATE NOT NULL DEFAULT '1000-01-01',
  Notes VARCHAR(255)
);
```

``` sql
CREATE TABLE employees (
  Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Firstname VARCHAR(45) NOT NULL,
  Lastname VARCHAR(45) NOT NULL
);
```
``` sql
INSERT INTO cars (Brand, Name, Fuel, Employee, Tüv, Notes) VALUES
('Volkswagen', 'Golf', 'Petrol', 'Hans Müller', '2025-04-15', 'Regular service'),
('Mercedes-Benz', 'C-Class', 'Diesel', 'Greta Schmidt', '2025-03-20', ''),
('BMW', '3 Series', 'Electric', 'Fritz Weber', '2024-09-10', 'Check tire pressure'),
('Audi', 'A4', 'Hybrid', 'Lisa Braun', '2025-12-25', 'Inspection due soon'),
('Porsche', '911', 'Petrol', 'Karl Fischer', '2023-07-22', '');
```
``` sql
INSERT INTO employees (Firstname, Lastname) VALUES
('Hans', 'Müller'),
('Greta', 'Schmidt'),
('Fritz', 'Weber'),
('Lisa', 'Braun'),
('Karl', 'Fischer');
```

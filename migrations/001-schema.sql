 -- Create a table for person
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    contact_number TEXT
);

-- Create a table for family members
CREATE TABLE FamilyTree (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    relationship TEXT,
    name TEXT,
    date_of_birth TEXT,
    FOREIGN KEY(person_id) REFERENCES Person(id)
);

-- Create a table for assets
CREATE TABLE Assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    asset_description TEXT,
    FOREIGN KEY(person_id) REFERENCES Person(id)
);

-- Create a table for asset distribution
CREATE TABLE AssetDistribution (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id INTEGER,
    beneficiary TEXT,
    percentage DECIMAL,
    FOREIGN KEY(asset_id) REFERENCES Assets(id)
);

INSERT INTO Person (name, address, contact_number) VALUES 
('John Doe', '123 Elm St, Springfield', '555-0100'),
('Jane Smith', '456 Oak St, Riverside', '555-0200'),
('Alice Johnson', '789 Pine St, Greenfield', '555-0300'),
('Bob Brown', '101 Maple St, Woodland', '555-0400'),
('Carol White', '234 Cedar St, Hill Valley', '555-0500'),
('David Black', '567 Birch St, Lakeside', '555-0600');

-- Assuming person IDs are from 1 to 6
INSERT INTO FamilyTree (person_id, relationship, name, date_of_birth) VALUES 
(1, 'Spouse', 'Mary Doe', '1970-01-01'),
(1, 'Child', 'Jimmy Doe', '1995-01-01'),
(2, 'Spouse', 'Alex Smith', '1971-02-02'),
(2, 'Child', 'Nancy Smith', '1996-02-02'),
(3, 'Spouse', 'Patrick Johnson', '1972-03-03'),
(3, 'Child', 'Chris Johnson', '1997-03-03'),
(4, 'Spouse', 'Lisa Brown', '1973-04-04'),
(4, 'Child', 'Diana Brown', '1998-04-04'),
(5, 'Spouse', 'Gary White', '1974-05-05'),
(5, 'Child', 'Samantha White', '1999-05-05'),
(6, 'Spouse', 'Rachel Black', '1975-06-06'),
(6, 'Child', 'Ethan Black', '2000-06-06');

-- Assuming person IDs are from 1 to 6
INSERT INTO Assets (person_id, asset_description) VALUES 
(1, 'House at 123 Elm St'),
(2, 'House at 456 Oak St'),
(3, 'Vacation home at 789 Pine St'),
(4, 'Investment Portfolio'),
(5, 'Art Collection'),
(6, 'Cottage at 567 Birch St');

-- Assuming asset IDs are from 1 to 6, and distributing assets to spouses and children
INSERT INTO AssetDistribution (asset_id, beneficiary, percentage) VALUES 
(1, 'Mary Doe', 50),
(1, 'Jimmy Doe', 50),
(2, 'Alex Smith', 50),
(2, 'Nancy Smith', 50),
(3, 'Patrick Johnson', 50),
(3, 'Chris Johnson', 50),
(4, 'Lisa Brown', 50),
(4, 'Diana Brown', 50),
(5, 'Gary White', 50),
(5, 'Samantha White', 50),
(6, 'Rachel Black', 50),
(6, 'Ethan Black', 50);

-- 12 Factor APp
-- XII. Admin processes
-- Run admin/management tasks as one-off processes. Creating tables, DB migrations and others.. 
-- 
    CREATE TABLE IF NOT EXISTS masterData_collection 
    (id varchar(256) NOT NULL primary key, 
    name varchar(256) NOT NULL,
    value varchar(256) NOT NULL,
    masterData varchar(256) NOT NULL);

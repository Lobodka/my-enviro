DROP TABLE IF EXISTS enviro_data;

CREATE TABLE enviro_data (
    zip VARCHAR (5) NOT NULL,
    city VARCHAR (255),
    air INT,
    haz_cleanups INT,
    lead_paint INT,
    water DECIMAL(3,1)
);

-- imports data from local file enviro_data.csv
LOAD DATA LOCAL INFILE 'data/enviro_data.csv' 
INTO TABLE enviro_data
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

DROP TABLE IF EXISTS indicator_details;

CREATE TABLE indicator_details (
    id VARCHAR (15),
    if_percent VARCHAR (1),
    indicator_name VARCHAR (50),
    icon_url VARCHAR (255),
    data_description VARCHAR (1000),
    summary VARCHAR (1000),
    learn_more VARCHAR (1000),
    protect_yourself VARCHAR (1000),
    footnote VARCHAR (1000),
    good_news VARCHAR (255),
    bad_news VARCHAR (255),
    no_data VARCHAR (255),
    threshold INT,
    source VARCHAR (255)
);

-- imports data from local file indicator_details.csv
LOAD DATA LOCAL INFILE 'data/indicator_details.csv' 
INTO TABLE indicator_details
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
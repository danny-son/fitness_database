## Instructions to Run web app
#### NOTE: Make sure you have two terminals open (one is needed to launch the webapp, and the other is needed to let our application listen for network calls) 

#### Tech stack used: ReactJS, NodeJS (Make sure you have the latest version of NodeJs installed -> https://nodejs.org/en/)

#### PRE-REQUISITE: Navigate to the ```database``` directory and import the dump file titled ```fitness_proj_dump.sql```

#### On the first terminal
1.) open the terminal and call ```cd [directory_name]``` where directory_name is whatever you named the project when unzipped.

2.) type in the following command: ```cd fitness-database-website/src```

3.) call ```npm i``` to install all the package dependencies for this webapp

4.) type in the command ```npm start``` which will run the webapp 

#### On the second terminal 

1.) ```cd``` into the directory of your project

2.) enter the following command: ```cd fitness-database-website/src/database_scripts```

3.) call ```node connect.js``` and confirm that it outputs `running server` on the terminal 

#### On the Webapp

1.) The webapp should launch prompting you to enter your username and password to connect to the database

2.) once that is done you can now explore around the webapp (first thing to do would be to register an account and login).

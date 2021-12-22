# Capstone - Seasons Website

#### This application implements React and Firebase and a calendar template in order to create a functional scheduling application for a business.

#### By Connor Hansen

## Technologies Used

* React JS
* Firebase
* 
* HTML
* MySQL
* Linq
* Entity Framework
* Swagger
* Postman

## Description

_This is primarily an app to demonstrate creation of an API. Users may use apps such as Postman in order to use full CRUD operations within the database. Swagger is implemented and CORS is enabled.On the front end, users may create, view details, sort, and search parks. The UI also counts the number of ratings a park has, and displays them in descending order._

## Setup/Installation Requirements

- _To clone and run from [GitHub Repo](https://github.com/chansen1395/ParksLookup.Solution):_

- _Use a program such as VSCode to view, run, and test the program._
  
- _Database Setup:_

- Create a file named "appsettings.json" in the Factory directory
  * add the following code to the appsettings.json file:

```
{
  "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Port=3306;database=[YOUR-NAME-HERE];uid=[YOUR-USERNAME-HERE];pwd=[YOUR-PASSWORD-HERE];"
  }
}
```
  * replace [YOUR-NAME-HERE] with the desired database name
  * replace [YOUR-USERNAME-HERE] with your unique MySql username
  * replace [YOUR-PASSWORD-HERE] with your unique MySql password
* Launch the MySql server:
  - In the terminal, run the command "$ mySql -u[YOUR-USERNAME-HERE] -p[YOUR-PASSWORD-HERE]", replacing [YOUR-PASSWORD-HERE] with your unique MySql password
* To Build the required database:
  - $ dotnet ef migrations add Initial
  - $ dotnet ef database update


- _In order to set up the project environment, in bash at a
 folder of your choice, type the following:_
    1. **$ git clone https://github.com/chansen1395/ParksLookup.Solution.git**
    2. **$ code .**
    3. **$ cd YourFolder.Solution/ParkLookup**
    4. **Install packages if not already installed:**
    ```
      $ dotnet add package Microsoft.EntityFrameworkCore -v 5.0.0
      $ dotnet add package Pomelo.EntityFrameworkCore.MySql -v 5.0.0-alpha.2
      $ dotnet add package Microsoft.EntityFrameworkCore.Proxies -v 5.0.0
      $ dotnet add package Microsoft.EntityFrameworkCore.Design -v 5.0.0
      $ dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore -v 5.0.0
      $ dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 5.0.0
      $ dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design -v 5.0.0
      $ dotnet add package Swashbuckle.AspNetCore
      $ dotnet tool install --global dotnet-ef
    ```
    5. _Skip if already completed_ **Build out your database Migrations with the following:**
    ```
      $ dotnet ef migrations add Initial
      $ dotnet ef database update
    ```
    6. **$ dotnet restore**<br>

- **Database Schema**

| parks       | Data Types   |
| ----------- | ------------ |
| ParkId      | Int          |
| User        | String (20)  |
| State       | String (50)  |
| City        | String (50)  |
| ParkName    | String (20)  |
| Activities  | String (500) |
| Rating      | Int (1 - 5)  |

- _In order to run the program, follow along with the previous steps. After step 4, navigate to the ParkLookup directory:_
```
    1. $ cd ..ParkLookup
    2. $ dotnet watch run
    3. _Navigate to http://localhost:5000/ in your browser.
```

- _General Navigation and Usage:_
  * Swagger UI: https://localhost:5001/index.html
  * All parks in JSON: https://localhost:5001/api/Parks
  * Specific park number: https://localhost:5001/api/Parks/{id}
  * UI: https://localhost:5001/About or https://localhost:5001/Sort
  * Sample JSON parameters for POST, PUT, and PATCH:
  ```
      {
        "user": "Timmy",
        "state": "Oregon",
        "city": "Astoria",
        "parkName": "Fort Stevens",
        "activities": "Camping, Hiking, Fishing, Beach, Biking, Museum",
        "rating": 4
      }
  ```

## Future Features

* _Instead of counting the number of ratings each park has, it would make more sense to display a count of the number of parks in each state or city._
* _Implement full CRUD on UI_
* _Implement API endpoints for search parameters; e.g.: api/Parks?state=oregon_

## Known Bugs

* _Edit and Delete routes are not functional, and references to it have been commented out._

## License

{Let me know if you run into any issues or have questions, ideas or concerns. I encourage you to contact me or make a contribution to the code.}

## Contact Information

- Connor Hansen: _{<chansen13@georgefox.edu>}_
- _{[GitHub Repo - main](https://github.com/chansen1395/ParksLookup.Solution)}_
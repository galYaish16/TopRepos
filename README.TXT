General architecture of the application
=== 
Client: Web(React).
Server: C# asp.net Core 6.0.
DB: Microsoft Entity Framework InMemory.
Application uses rest architecture guidlines.
===

Reasoning behind main technical choices:
===
architecture was selected according to requirments, 
Microsoft best practice guidlines: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-6.0&tabs=visual-studio-code#scaffold-a-controller-1".
using InMemory DB to show general CRUD capabilities.
using JS vanilla code as much as possible due to timeline.
===

Features you didn't implement:
===
1. cache Avatar images - fetch the image as Base64 and save it to local storage with the repisotory id.
2. infinite scrolling - detect when scroll is reached, using scroll event and fetch the next result page.
3. Provide a clear user experience when there is no internet connection - add Eror handling and style to alert the user using react.
===

Anything else you feel should be included:
===
using caching mechanism in the controller to save repisotories for the same period.
===


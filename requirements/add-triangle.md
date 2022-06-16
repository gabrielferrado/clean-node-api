# Create trianlge

> ## Success case:
1. ⛔️ Receives a request of type **POST** in route **/api/triangles**
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Validates mandatory **length** and **sides** data
1. ⛔️ Determine a **type** for the triangle
1. ⛔️ Create a triangle with the data provided
1. ⛔️ Returns 200 with triangle data

> ## Exceptions:
1. ⛔️ Returns 404 error if API does not exist
1. ⛔️ Returns 403 error if user is not authenticated
1. ⛔️ Returns error 400 if **length** or **sides** are not provided by the client
1. ⛔️ Returns error 400 if **length** is lesser than zero
1. ⛔️ Returns error 400 if **sides** are not equals three
1. ⛔️ Returns error 400 if the **sum of the lengths** of any **two sides** are not **greater than or equal** to the length of the **third side**.
1. ⛔️ Returns error 500 if there is an error when trying to create the triangle

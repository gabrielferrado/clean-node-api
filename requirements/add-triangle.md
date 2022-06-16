# Create trianlge

> ## Success case:
1. ⛔️ Receives a request of type **POST** in route **/api/triangles**
2. ⛔️ Validates if the request was made by a user
3. ⛔️ Validates mandatory **length** and **sides** data
4. ⛔️ Validates if **length** is greater than zero
5. ⛔️ Validates if **sides** are not equals to three
6. ⛔️ Determine a **type** for the triangle
7. ⛔️ Create a triangle with the data provided
8. ⛔️ Returns 200 with triangle data

> ## Exceptions:
1. ⛔️ Returns 404 error if API does not exist
1. ⛔️ Returns 403 error if user is not authenticated
1. ✅️ Returns error 400 if **length** or **sides** are not provided by the client
1. ⛔️ Returns error 400 if the **sum of the lengths** of any **two sides** are not **greater than or equal** to the length of the **third side**.
1. ⛔️ Returns error 500 if there is an error when trying to create the triangle

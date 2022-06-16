# Login

> ## Success case:
1. ✅ Receive a request of type **POST** in route **/api/login**
1. ✅ Validates mandatory data **email** and **password**
1. ✅ Validates that the **email** field is a valid e-mail
1. ✅ Search the user with the email and password provided
1. ✅ Generate an access token from the user ID
1. ✅ Update user data with generated access token
1. ✅ Returns 200 with access token

> ## Exceptions:
1. ✅ Returns 404 error if API does not exist
1. ✅ Returns error 400 if **email** or **password** are not provided by the client
1. ✅ Returns error 400 if the **email** field is an invalid email
1. ✅ Returns 401 error if it doesn't find a user with the given data
1. ✅ Returns error 500 if there is an error when trying to generate the access token
1. ✅ Returns error 500 if there is an error when trying to update the user with the generated access token

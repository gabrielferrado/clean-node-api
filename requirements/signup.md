# Signup

> ## Success case

1. ✅ Receive a request of type **POST** in route **/api/signup**
2. ✅ Validates mandatory data **name**, **email**, **password** and **passwordConfirmation**
3. ✅ Validates that **password** and **passwordConfirmation** are the same
4. ✅ Validates that the **email** field is a valid email
5. ⛔️ **Validates** if a user already exists with the provided email
6. ✅ Generates an **encrypted** password (this password cannot be decrypted)
7. ✅ **Creates** an account for the user with the information provided, **replacing** the password with the encrypted password
8. ✅ Generate an **access token** from the user ID
9. ✅ **Updates** the user data with the generated access token
10. ✅ Returns **200** with access token and username

> ## Exceptions

1. ✅ Returns error **404** if API does not exist
2. ✅ Returns error **400** if name, email, password or passwordConfirmation are not provided by the client
3. ✅ Returns error **400** if password and passwordConfirmation are not the same
4. ✅ Returns error **400** if the email field is an invalid email
5. ✅ Returns error **403** if the provided email is already in use
6. ✅ Returns error **500** if there is an error when trying to generate an encrypted password
7. ✅ Returns error **500** if there is an error when trying to create the user account
8. ✅ Returns error **500** if there is an error when trying to generate the access token
9. ✅ Returns error **500** if there is an error when trying to update the user with the generated access token

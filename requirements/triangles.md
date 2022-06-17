# List triangles

> ## Success case:
1. ⛔️ Receives a **GET** request in the **/api/triangles** route
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Returns 204 if response is empty
1. ✅️ Returns 200 with triangle data

> ## Exceptions:
1. ⛔️ Returns 404 error if API does not exist
1. ⛔️ Returns 403 error if not authenticated
1. ✅️ Returns error 500 if there is an error when trying to list triangles

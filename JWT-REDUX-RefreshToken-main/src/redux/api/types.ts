// Define the IUser interface to represent a user object
export interface IUser {
  name: string; // The name of the user
  email: string; // The email address of the user
  role: string; // The role of the user (e.g., admin, user)
  _id: string; // The unique identifier for the user
  createdAt: Date; // The date the user was created
  updateAt: Date; // The date the user was last updated
  __v: number; // The version number of the user object (used for concurrency control)
}

// Define the GenericResponse interface to represent a generic API response
export interface GenericResponse {
  status: string; // The status of the response (e.g., success, error)
  message: string; // A message providing additional information about the response
}

//   This code defines two TypeScript interfaces: IUser and GenericResponse. The IUser interface represents a user object with properties such as name, email, role, etc. The GenericResponse interface represents a generic API response with a status and a message. These interfaces can be used throughout your application to provide type checking and autocompletion for objects that adhere to these structures.

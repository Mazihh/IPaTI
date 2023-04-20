export interface User {
    username: string
    email: string
    password: number
  }

  export interface UserLogin {
    username: string
    password: number
  }

  export interface GetOneUser {
    email: string
    is_active: boolean
    password: string
    public_id: string
    username: string
    
  } 


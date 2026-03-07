export interface IResponse {
    limit: number,
    skip: number,
    total: number,
    users: IUserProps[],
}
// extend this obj for show more keys
export interface IUserProps {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    image: string,
    role: string,
    gender: string,
}


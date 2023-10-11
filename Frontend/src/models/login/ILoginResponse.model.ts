export interface ILoginResponse {
    token: string,
    personalDetails: {
        name: string,
        Team: string,
        joinedAt: string,
        avatar: string
    }
}
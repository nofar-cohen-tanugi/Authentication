export interface ILoginResponse {
    token: string,
    personalDetails: {
        name: string,
        Team: string,
        joinedAt: Date,
        avatar: string
    }
}
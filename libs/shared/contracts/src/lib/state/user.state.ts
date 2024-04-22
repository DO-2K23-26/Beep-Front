import { UserEntity } from "../entities"

export interface UserState {
    user?: UserEntity
    isAuthenticated: boolean
    isLoading: boolean
    tokens: {
        refreshToken?: string | null
        accessToken?: string | null
    }
    payload?: {
        audited_account: boolean
        sub: string
        exp: number
        resource_access: {
            roles: string[]
        }
    }
}

import { rightMoveApi } from "./api"
import { IRightMoveProperty, IRightMoveResponse } from "./IRightMoveProperty"
import { ISearchParams } from "./ISearchParams"

export const search = async (searchParams: ISearchParams): Promise<IRightMoveResponse> => {
    const { status, data } = await rightMoveApi.get<IRightMoveResponse>('api/_search', {
        params: searchParams
    })


    if (status === 200 && data)
        return data
    
    console.error("Failed to execute search", status, data)
    throw new Error("Failed to execute search")
}


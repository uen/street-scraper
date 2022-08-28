import { rightMoveApi } from "./api"
import { IRightMoveProperty } from "./IRightMoveProperty"
import { ISearchParams } from "./ISearchParams"

export const search = async (searchParams: ISearchParams): Promise<IRightMoveProperty> => {
    const { status, data } = await rightMoveApi.get<IRightMoveProperty>('api/_search', {
        params: searchParams
    })


    if (status === 200 && data)
        return data

    throw new Error(`Failed to execute search: ${searchParams}`)
}


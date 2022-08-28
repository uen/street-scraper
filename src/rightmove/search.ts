import { rightMoveApi } from "./api"
import { SearchParams } from "./ISearchParams"

export const search = async (searchParams: SearchParams) => {
    rightMoveApi.get('', {
        params: searchParams
    })
}


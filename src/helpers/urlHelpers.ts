export type queryParamsType = {
    q: string,
    page: number,
    limit: number,
    sort: string | null,
    order: string | null
}

export const prepareUrl = (baseUrl: string, queryParams: queryParamsType, defaultQueryParams: queryParamsType): string => {


    let newUrl = baseUrl;
    const newSearchParams = new URLSearchParams();

    if (JSON.stringify(defaultQueryParams) !== JSON.stringify(queryParams)) {
        (Object.keys(queryParams) as Array<keyof queryParamsType>)
            .forEach((key) => {
                if (queryParams[key] !== defaultQueryParams[key] && queryParams[key] !== null) {
                    newSearchParams.append(key, queryParams[key] as string)
                }
            })
        newUrl += '?' + newSearchParams.toString()
    }

    return newUrl
}

export const prepareApiUrl = (baseUrl: string, queryParams: queryParamsType): string => {
    let newUrl = baseUrl;
    const newSearchParams = new URLSearchParams();

    // console.log('queryParams', queryParams);

    (Object.keys(queryParams) as Array<keyof queryParamsType>)
        .forEach((key) => {
            if (queryParams[key] !== null) {

                const prefix = key === 'q' ? '' : '_'
                newSearchParams.append(prefix + key, queryParams[key] as string)
            }
        })
    newUrl += '?' + newSearchParams.toString()
    console.log('newUrl', newUrl);

    return newUrl
}
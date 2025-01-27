export function setSearchParamsString(searchParams : URLSearchParams, changes:Record<string, string | number | undefined>){
    const newSearchParams = new URLSearchParams(searchParams);
    for(const [key,value] of Object.entries(changes)){
        if (value === undefined) {
            newSearchParams.delete(key);
            continue;
        }
        newSearchParams.set(key,String(value));
    }
    return Array.from(newSearchParams.entries()).map(([key,value]) => value ? `${key}=${encodeURI(value)}` : key).join("&");
}
export class FetchData<T> 
{
    private url: string;

    constructor(url: string) 
    {
        this.url = url;
    }

    async fetchJsonData(): Promise<T[]> 
    {
        const res = await fetch(this.url);

        if (!res.ok) 
        {
            throw new Error(`Fetch failed with status ${res.status}`);
        }

        return await res.json() as T[];
    }
}

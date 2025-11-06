import { LanguageJSON } from "../interfaces/api/language.interface.js"

export class FetchData
{
    private url: string;
    private result: Response | null = null;
    private jsonData: LanguageJSON[] | null = null;

    constructor(url: string)
    {
        this.url = url;
    }

    async fetchJsonData(): Promise<LanguageJSON[] | string>
    {
        try
        {
            this.result = await fetch(this.url);
            const data: LanguageJSON[] = await this.result.json();
            this.jsonData = data;
            // console.log(this.jsonData);
            return this.jsonData
        }
        catch (error)
        {
            return `An error fetching json data: ${error} `;
        }
    }
}
export enum Language {
    English,
    Spanish
}

export default class Localisation {
    public get activeLanguage(): Language {
        // TODO
        return Language.English;
    }
}

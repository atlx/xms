export enum Language {
    English = "English",
    Spanish = "Spanish",
    MandarinChinese = "Mandarin Chinese",
    Russian = "Russian"
}

export default class Localisation {
    public get activeLanguage(): Language {
        // TODO
        return Language.English;
    }
}

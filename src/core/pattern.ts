export default abstract class Pattern {
    /**
     * Matches partial user mentions, ex. '@username'.
     */
    public static partialMention: RegExp = /@[^\s]+/;
}

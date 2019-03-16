export default abstract class Pattern {
    /**
     * Matches partial user mentions, ex. '@username'.
     */
    public static partialMention: RegExp = /@[^\s]+/;

    /**
     * Matches absolute user mentions, ex. '<@2aae6c35c94fcfb415>'.
     */
    public static absoluteMention: RegExp = /<@[a-z0-9]+>/;

    /**
     * Matches a valid text message content.
     */
    public static message: RegExp = /^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i;
}

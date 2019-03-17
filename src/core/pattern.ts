export default abstract class Pattern {
    /**
     * Matches partial user mentions, ex. '@username'.
     */
    public static partialMention: RegExp = /@[_a-z]{2,25}/i;

    /**
     * Matches italic markdown format, ex. '*text*'.
     */
    public static italicText: RegExp = /\*\*[^]+\*\*/;

    /**
     * Matches bold markdown format, ex. '**text**'.
     */
    public static boldText: RegExp = /\*\*[^]+\*\*/;

    /**
     * Matches absolute user mentions, ex. '<@:2aae6c35c94fcfb415>'.
     */
    public static absoluteMention: RegExp = /<@:[a-z0-9]+>/;

    /**
     * Matches a valid text message content.
     */
    public static message: RegExp = /^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i;

    /**
     * Matches valid usernames.
     */
    public static username: RegExp = /[_a-z]{2,25}/i;
}

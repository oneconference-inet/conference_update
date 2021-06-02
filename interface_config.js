/* eslint-disable no-unused-vars, no-var, max-len */
/* eslint sort-keys: ["error", "asc", {"caseSensitive": false}] */

var interfaceConfig = {
    APP_NAME: "ONECONFERENCE",
    AUDIO_LEVEL_PRIMARY_COLOR: "rgba(255,255,255,0.4)",
    AUDIO_LEVEL_SECONDARY_COLOR: "rgba(255,255,255,0.2)",

    // ONE Conference
    DOMAIN_ONEMAIL: 'https://oneconference-mail.inet.co.th', //backend Onemail Service
    DOMAIN_BACK: 'https://oneconference-vc.inet.co.th', // backend for MC
    DOMAIN_ONEMAIL_DGA: 'https://meetgov.one.th',
    DOMAIN: 'https://oneconference-new.inet.co.th', // frontend Redirect
    // MC_IP: '192.168.92.1:27017',
    SOCKET_NODE: "https://oneconference-new.inet.co.th", // Socket io node
    // SOCKET_NODE: "https://oneconf-dev3.cloudns.asia", // Socket io node
    // DEFAULT_LOGO_URL: '/images/inetlogo.png',
    // 'https://oneconf-dev3.cloudns.asia/images/watermark.png',
    EDIT_NAME: false,
    DECODE_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVjb25mZXJlbmNlIiwibmFtZSI6Im9uZWNvbmZlcmVuY2VAaW5ldCEiLCJpYXQiOjE1MTYyMzkwMjJ9.76dYYbFS1Hlv9vfu2hZ31a3qwA4p_5jYuLqYiBiHPmw',

    // secret key เอาไว้แนบ header ตอน endmeeting hangup 
    // test
    SECRET_KEY_MANAGE_AI: 'GAMhV1WeAfQtwhQYbMoaZU5UYCA18Y5ittoWZKxCZ1IWYhAYGQ0RKfGFA1Pe5Qw1E78AwqACIGo5A01yKWaAxZ8QQjWftAVK0bVP',
    SECRET_KEY_ONECHAT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWaWRlb2NhbGwiLCJuYW1lIjoiT05FQ0hBVFNFUlZJQ0UiLCJpYXQiOjIyMDF9.-llQuCLFEUdv4BdJ1pf0-4KwrfwnXz7ybqS10DFLuBs',
    SECRET_KEY_ONE_DENTAL: 'R1P0TIzFKTdr5YSmQ0gcRt6U6xfs0W3OyHxKG52YlSfY4mkf140pWt6K1xoGb71n2mmYGdAeEoWMcAU5BcjbHeXjaLQeryg1zj2d',
    SECRET_KEY_ONE_BINAR: 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKV2FXUmxiMk5oYkd3aUxDSnVZVzFsSWpvaVQyNWxZbWx1WVhJaUxDSnBZWFFpT2pJeU1ERjkuSGgzNzVQUU9uMHN0cXhXSU9ESmI1M1RGWlRXOXhvRXlOaXJaaWZ0bVVsWQ==',
    SECRET_KEY_JMC: '1YRvZyjd8vZsa1u3dKx1GlNYjersxv6WTS0gXeflVbyXKC6M4zHEsybpOfoYAJqVv4wdaMoqMkoYheBEPhFdgmK4Gxfhx3v8XlMo',
    SECRET_KEY_TELEMEDICINE: 'P1v59giDigTxczqz8azhRouzvzzeHDt1HuPPdywGXCwjAA42C2Owb6OIl5HH8lC8sXwMSJ7Q9ZKeUwCkvnYif094OkaEz7tKuMyV',
    SECRET_KEY_ONECONF: 'OoLdyF822kaIi28K35qCzXMwAxQP56Mt53p0T3O3VcgofWjbq8Kr9Ajz6WId3ffilkZXm0pWBCgfd8FVqaPBkYAbH4kXbqFph4p7',

    // service Intregate ['oneconference','onechat','ManageAi'] // onemail only!!
    SERVICE_INT: ['onechat', 'manageAi','onebinar', 'onedental', 'jmc', 'telemedicine'],
    SERVICE_INVITE_FEATURE: ['oneconference'],
    SERVICE_RECORD_FEATURE: ['oneconference'],
    SERVICE_LIVE_FEATURE: ['oneconference'],
    SERVICE_APPROVE_FEATURE: ['oneconference'],

    AUTO_PIN_LATEST_SCREEN_SHARE: 'remote-only',
    BRAND_WATERMARK_LINK: '',

    CLOSE_PAGE_GUEST_HINT: false, // A html text to be shown to guests on the close page, false disables it
    /**
     * Whether the connection indicator icon should hide itself based on
     * connection strength. If true, the connection indicator will remain
     * displayed while the participant has a weak connection and will hide
     * itself after the CONNECTION_INDICATOR_HIDE_TIMEOUT when the connection is
     * strong.
     *
     * @type {boolean}
     */
    CONNECTION_INDICATOR_AUTO_HIDE_ENABLED: true,

    /**
     * How long the connection indicator should remain displayed before hiding.
     * Used in conjunction with CONNECTION_INDICATOR_AUTOHIDE_ENABLED.
     *
     * @type {number}
     */
    CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,

    /**
     * If true, hides the connection indicators completely.
     *
     * @type {boolean}
     */
    CONNECTION_INDICATOR_DISABLED: false,

    DEFAULT_BACKGROUND: "#474747",
    DEFAULT_LOCAL_DISPLAY_NAME: "me",
    DEFAULT_LOGO_URL: "https://meet-room.one.th/images/logo_inet.png", // DEL
    DEFAULT_REMOTE_DISPLAY_NAME: "OneConference",
    DEFAULT_WELCOME_PAGE_LOGO_URL: "images/watermark.svg",

    DISABLE_DOMINANT_SPEAKER_INDICATOR: false,

    DISABLE_FOCUS_INDICATOR: false,

    /**
     * If true, notifications regarding joining/leaving are no longer displayed.
     */
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,

    /**
     * If true, presence status: busy, calling, connected etc. is not displayed.
     */
    DISABLE_PRESENCE_STATUS: false,

    /**
     * Whether the ringing sound in the call/ring overlay is disabled. If
     * {@code undefined}, defaults to {@code false}.
     *
     * @type {boolean}
     */
    DISABLE_RINGING: false,

    /**
     * Whether the speech to text transcription subtitles panel is disabled.
     * If {@code undefined}, defaults to {@code false}.
     *
     * @type {boolean}
     */
    DISABLE_TRANSCRIPTION_SUBTITLES: false,

    /**
     * Whether or not the blurred video background for large video should be
     * displayed on browsers that can support it.
     */
    DISABLE_VIDEO_BACKGROUND: false,

    DISPLAY_WELCOME_FOOTER: false,
    DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
    DISPLAY_WELCOME_PAGE_CONTENT: false,
    DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,

    ENABLE_DIAL_OUT: true,

    ENABLE_FEEDBACK_ANIMATION: false, // Enables feedback star animation.

    FILM_STRIP_MAX_HEIGHT: 120,

    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,

    /**
     * Hide the logo on the deep linking pages.
     */
    HIDE_DEEP_LINKING_LOGO: false,

    /**
     * Hide the invite prompt in the header when alone in the meeting.
     */
    HIDE_INVITE_MORE_HEADER: true,

    INITIAL_TOOLBAR_TIMEOUT: 20000,
    JITSI_WATERMARK_LINK: "https://inet.co.th",

    LANG_DETECTION: true, // Allow i18n to detect the system language
    LIVE_STREAMING_HELP_LINK: "https://jitsi.org/live", // Documentation reference for the live streaming feature.
    LOCAL_THUMBNAIL_RATIO: 16 / 9, // 16:9

    /**
     * Maximum coefficient of the ratio of the large video to the visible area
     * after the large video is scaled to fit the window.
     *
     * @type {number}
     */
    MAXIMUM_ZOOMING_COEFFICIENT: 1.3,

    /**
     * Whether the mobile app Jitsi Meet is to be promoted to participants
     * attempting to join a conference in a mobile Web browser. If
     * {@code undefined}, defaults to {@code true}.
     *
     * @type {boolean}
     */
    MOBILE_APP_PROMO: true,

    /**
     * Specify custom URL for downloading android mobile app.
     */
    //MOBILE_DOWNLOAD_LINK_ANDROID: 'https://play.google.com/store/apps/details?id=org.jitsi.meet',

    /**
     * Specify custom URL for downloading f droid app.
     */
    //MOBILE_DOWNLOAD_LINK_F_DROID: 'https://f-droid.org/en/packages/org.jitsi.meet/',

    /**
     * Specify URL for downloading ios mobile app.
     */
    //MOBILE_DOWNLOAD_LINK_IOS: 'https://itunes.apple.com/us/app/jitsi-meet/id1165103905',

    NATIVE_APP_NAME: "ONECONFERENCE",

    // Names of browsers which should show a warning stating the current browser
    // has a suboptimal experience. Browsers which are not listed as optimal or
    // unsupported are considered suboptimal. Valid values are:
    // chrome, chromium, edge, electron, firefox, nwjs, opera, safari
    OPTIMAL_BROWSERS: [
        "chrome",
        "chromium",
        "firefox",
        "nwjs",
        "electron",
        "safari",
    ],

    POLICY_LOGO: null,
    PROVIDER_NAME: "ONECONFERENC",

    /**
     * If true, will display recent list
     *
     * @type {boolean}
     */
    RECENT_LIST_ENABLED: true,
    REMOTE_THUMBNAIL_RATIO: 1, // 1:1

    // SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
    SETTINGS_SECTIONS: ["devices", "language", "moderator"],
    SHOW_BRAND_WATERMARK: false,

    /**
     * Decides whether the chrome extension banner should be rendered on the landing page and during the meeting.
     * If this is set to false, the banner will not be rendered at all. If set to true, the check for extension(s)
     * being already installed is done before rendering.
     */
    SHOW_CHROME_EXTENSION_BANNER: false,

    SHOW_DEEP_LINKING_IMAGE: false,
    SHOW_JITSI_WATERMARK: true,
    SHOW_POWERED_BY: false,
    SHOW_PROMOTIONAL_CLOSE_PAGE: false,

    /*
     * If indicated some of the error dialogs may point to the support URL for
     * help.
     */
    SUPPORT_URL: "https://inet.co.th",

    TOOLBAR_ALWAYS_VISIBLE: true, //DEV for Toolbar

    /**
     * The name of the toolbar buttons to display in the toolbar, including the
     * "More actions" menu. If present, the button will display. Exceptions are
     * "livestreaming" and "recording" which also require being a moderator and
     * some values in config.js to be enabled. Also, the "profile" button will
     * not display for users with a JWT.
     * Notes:
     * - it's impossible to choose which buttons go in the "More actions" menu
     * - it's impossible to control the placement of buttons
     * - 'desktop' controls the "Share your screen" button
     */
    // TOOLBAR_BUTTONS: [
    //     'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
    //     'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
    //     'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
    //     'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
    //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
    // ],

    TOOLBAR_BUTTONS: [
        "microphone",
        "camera",
        "closedcaptions",
        "desktop",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "profile",
        "chat",
        "recording",
        "endmeeting",
        "note",
        "livestreaming",
        "etherpad",
        "sharedvideo",
        "settings",
        "raisehand",
        "videoquality",
        "filmstrip",
        "invite",
        "feedback",
        "shortcuts",
        "tileview",
        "download",
        "help",
        "mute-everyone",
        "security",
        "poll"
    ],

    TOOLBAR_TIMEOUT: 4000,

    // Browsers, in addition to those which do not fully support WebRTC, that
    // are not supported and should show the unsupported browser page.
    UNSUPPORTED_BROWSERS: [],

    /**
     * Whether to show thumbnails in filmstrip as a column instead of as a row.
     */
    VERTICAL_FILMSTRIP: true,

    // Determines how the video would fit the screen. 'both' would fit the whole
    // screen, 'height' would fit the original video height to the height of the
    // screen, 'width' would fit the original video width to the width of the
    // screen respecting ratio.
    VIDEO_LAYOUT_FIT: "both",

    /**
     * If true, hides the video quality label indicating the resolution status
     * of the current large video.
     *
     * @type {boolean}
     */
    VIDEO_QUALITY_LABEL_DISABLED: false,

    /**
     * How many columns the tile view can expand to. The respected range is
     * between 1 and 5.
     */
    // TILE_VIEW_MAX_COLUMNS: 5,

    /**
     * Specify Firebase dynamic link properties for the mobile apps.
     */
    // MOBILE_DYNAMIC_LINK: {
    //    APN: 'org.jitsi.meet',
    //    APP_CODE: 'w2atb',
    //    CUSTOM_DOMAIN: undefined,
    //    IBI: 'com.atlassian.JitsiMeet.ios',
    //    ISI: '1165103905'
    // },

    /**
     * Specify mobile app scheme for opening the app from the mobile browser.
     */
    // APP_SCHEME: 'org.jitsi.meet',

    /**
     * Specify the Android app package name.
     */
    // ANDROID_APP_PACKAGE: 'org.jitsi.meet',

    /**
     * Override the behavior of some notifications to remain displayed until
     * explicitly dismissed through a user action. The value is how long, in
     * milliseconds, those notifications should remain displayed.
     */
    ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 4000,

    // List of undocumented settings
    /**
     INDICATOR_FONT_SIZES
     PHONE_NUMBER_REGEX
    */

    // Allow all above example options to include a trailing comma and
    // prevent fear when commenting out the last value.
    // eslint-disable-next-line sort-keys
    makeJsonParserHappy: "even if last key had a trailing comma",

    // No configuration value should follow this line.
};

/* eslint-enable no-unused-vars, no-var, max-len */

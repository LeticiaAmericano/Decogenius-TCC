export const ErrorModalConstants = {
    title: 'Something went wrong...',
    errorTexts: {
        errorNetworkErrorText:
            'Check if your internet connection is working properly.',
        errorDefaultText:
            'An unexpected error occurred, please try again later.',
        error401Text:
            'Make sure your email and password have been entered correctly.',
        error403Text:
            'Your user does not have the necessary permission to perform the activity.',
        error400Text:
            'Some field matches an account that already exists',
        loginNotAuthorizedText:
            'The user is not authorized to access the system.',
    },
    button: 'Close',
    default: 'Default',
    knownErrors: [
        '400',
        '401',
        '403',
        'Default',
        'NetworkError',
        'Network Error',
        'Unverified'
    ],
    unverified: 'Unverified',
    regex: /Error: ([\w\s]+)/
};

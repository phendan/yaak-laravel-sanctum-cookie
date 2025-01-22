# Laravel Sanctum Cookie - Yaak Plugin

Authenticating with a Laravel API via Sanctum requires first sending a request to your API's CSRF Cookie endpoint and extracting the CSRF Token. This token then needs to be URL-decoded and sent in the subsequent request using the custom `X-XSRF-TOKEN` header.

Doing all this manually every time is quite involved and time-consuming. Therefore I wrote this little Yaak plugin to make the process simpler using a template function.

# Usage

To use this plugin, proceed as follows:

1. Create a request to your Laravel API's CSRF Cookie endpoint
2. Create the request for which you want CSRF protection (e.g. a login request)
3. Go to the request's `Headers` tab and add a key named `X-XSRF-TOKEN`. For the value of the header, start typing `laravel_csrf_cookie` and select the corresponding function.
4. Click on the template and select your CSRF Cookie request.

That's it!

The template function will now automatically retrieve the CSRF Cookie, extract the token, and attach it to your request.

## Global Variables

If you're using CSRF Protection in a lot of places, it might make sense to declare a global variable for the token value. This is possible in Yaak by setting the value of a global environment variable to the result of your template function.

To do this, open up

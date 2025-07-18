# Laravel Sanctum Cookie - Yaak Plugin

Authenticating a web app with a Laravel API via [Sanctum](https://laravel.com/docs/11.x/sanctum#spa-authentication) requires first sending a request to your API's CSRF Cookie endpoint and extracting the CSRF Token. This token then needs to be URL-decoded and sent along in the subsequent request using the custom `X-XSRF-TOKEN` header.

Doing all this manually every time a request is sent is quite involved and time-consuming. Therefore I wrote this little plugin for the [Yaak](https://yaak.app/) API client to make the process simpler using a template function.

# Usage

To use this plugin, proceed as follows:

1. In Yaak, go to `Settings > Plugins`, search for `Laravel Sanctum Cookie` and hit `Install`.
2. Create a request to your Laravel API's CSRF Cookie endpoint (`/sanctum/csrf-cookie`)
3. Create the request for which you want CSRF protection (e.g. a login request)
4. Go to the `Headers` tab of the protected request and add a key named `X-XSRF-TOKEN`. For the value of the header, start typing `laravel_csrf_cookie` and select the corresponding function.
5. Click on the template and select your CSRF Cookie request.

That's it!

The template function will now automatically retrieve the CSRF Cookie, extract the token, and attach it to your request.

## Global Variables

If you're using CSRF protection in a lot of places, it might make sense to declare a global variable for the token value so that it's easily configurable. This is possible in Yaak by setting the value of a global environment variable to the result of your template function.

To do this, open up your environment and select "Manage Environments" (or hit `CMD+Shift+E`). Add a variable (e.g. `csrfToken`) and add the template function as the value, much like in steps 3. and 4. After that, use the environment variable in your request's `X-XSRF-TOKEN` header in place of the template function.

# Further Reading

If you'd like to learn more about the auth flow in Laravel Sanctum and how to avoid common pitfalls, I recommend this excellent write-up on Codecourse. It's using Postman for the walkthrough, but the principles remain the same:

[Laravel Sanctum Explainer on Codecourse.com](https://codecourse.com/articles/laravel-sanctum-airlock-with-postman)

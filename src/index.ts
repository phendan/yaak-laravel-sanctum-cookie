import { PluginDefinition } from '@yaakapp/api';
import type { Context, CallTemplateFunctionArgs } from '@yaakapp/api';

export const plugin: PluginDefinition = {
    templateFunctions: [
        {
            name: 'laravel_csrf_cookie',
            description: 'Retrieve the CSRF Cookie from Laravel Sanctum',
            args: [
                {
                    type: 'http_request',
                    name: 'request',
                    label: 'Sanctum Cookie Request'
                },
                {
                    type: 'text',
                    name: 'name',
                    label: 'Sanctum Cookie Name',
                    defaultValue: 'XSRF-TOKEN',
                    placeholder: 'Laravel uses "XSRF-TOKEN" by default.'
                }
            ],
            async onRender(
                ctx: Context,
                args: CallTemplateFunctionArgs
            ): Promise<string | null> {
                const requestId = args.values.request;
                const cookieName = args.values.name ?? 'XSRF-TOKEN';

                if (typeof requestId === 'undefined') return null;
                const httpRequest = await ctx.httpRequest.getById({ id: requestId });

                if (httpRequest === null) return null;
                const response = await ctx.httpRequest.send({ httpRequest });

                if (response.error || response.status === 0) {
                    const message = `Failed to send dependent request: ${httpRequest?.name}`;
                    ctx.toast.show({ color: 'warning', message });
                    return null;
                }

                const cookie = response.headers.find(it => {
                    return (
                        (it.name === 'Set-Cookie' || it.name === 'set-cookie') &&
                        it.value.includes(cookieName)
                    );
                });

                if (typeof cookie === 'undefined') {
                    const message = `There was no ${cookieName} header present on the response.`;
                    ctx.toast.show({ color: 'warning', message });
                    return null;
                }

                const pattern = new RegExp(`(?<=${cookieName}=)[^;]+`, 'g');
                const token = cookie.value.match(pattern)![0];

                return decodeURIComponent(token);
            }
        }
    ]
};

import { PluginDefinition } from '@yaakapp/api';

export const plugin: PluginDefinition = {
    templateFunctions: [],
    httpRequestActions: [
        {
            key: 'example-plugin',
            label: 'Hello, From Plugin',
            icon: 'cake',
            async onSelect(ctx, args) {
                ctx.toast.show({
                    color: 'success',
                    message: `You clicked the request ${args.httpRequest.name}`
                });
            }
        }
    ]
};

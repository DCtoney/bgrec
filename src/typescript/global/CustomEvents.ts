// Initialize "clickoutside" event
let originalAddEventListener = jQuery.fn.on as Function;
jQuery.fn.on = function (this: JQuery, type: string, listener: (event: Event) => any) {
    if (type === "clickoutside") {
        this.each(index => {
            document.addEventListener('click', event => {
                if (!event.composedPath().includes(this[index])) {
                    listener(event);
                }
            });
        });
    }
    else originalAddEventListener.call(this, type, listener);
} as any;

export function dontUseThis() { }

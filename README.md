O bug acontece quando se clica no botão "Edit" no component UserList.

Texto do warning:

Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

A aplicaçao não quebra, mas acusa esse warning.
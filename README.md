# `<nostr-one />`

The `<nostr-one>` custom element is a reusable web component that provides a simple way to integrate with the Nostr [NIP 98](https://github.com/nostr-protocol/nips/blob/master/98.md) HTTP Auth. It can be used in any web project that supports custom elements.

## Installation

```bash
npm install nostr-one
```

```js
import "nostr-one";
```

## Usage

To use the `<nostr-one>` custom element in your web project, you can include it in your HTML file and configure it using attributes:

```html
<nostr-one
  login-url="https://example.com/login"
  http-method="post"
></nostr-one>
```

In this example, we configure the component using the `login-url` and `http-method` attributes. These attributes correspond to the options you can pass to the `NostrOne` class constructor.

You can also configure the component using JavaScript:

```html
<nostr-one id="nostr-one"></nostr-one>
<script>
  const nostrOne = document.getElementById('nostr-one');
  nostrOne.loginUrl = 'https://example.com/login';
  nostrOne.httpMethod = 'post';
  nostrOne.onSuccess = function(data) {
    console.log('Success:', data);
  };
  nostrOne.onError = function(error) {
    console.error('Error:', error);
  };
  nostrOne.onClick = function(eventB64) {
    console.log('Click:', eventB64);
  };
</script>
```

In this example, we use JavaScript to configure the component after it has been added to the DOM. We access the component using its `id` attribute and set its properties using JavaScript.

## API

The `<nostr-one>` custom element has the following properties:

### `loginUrl` required

The URL to use for the Nostr API login endpoint.

### `httpMethod`

The HTTP method to use for the Nostr API login request.
Accepts `get` and `post`
Default to `post`

### `onSuccess`

A callback function to be called when the Nostr API login request succeeds. The function is passed the response data as an argument.

### `onError`

A callback function to be called when the Nostr API login request fails. The function is passed the error object as an argument.

### `onClick`

⚠️ If used, the component will not send the HTTP request automatically.\
A callback function to be called when the user clicks on the component. The function is passed the event data as a base64-encoded string.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
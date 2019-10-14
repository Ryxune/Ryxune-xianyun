import { Message } from "element-ui";

export default function ({ $axios, redirect }) {
  $axios.onError(err => {
    let { statusCode, message } = err.response.data;
    if (statusCode === 400) {
      Message.warning({ message });
    }
  })
}

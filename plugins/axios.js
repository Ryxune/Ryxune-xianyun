import { Message } from "element-ui";

export default (context) => {
  context.$axios.onError(err => {
    let { statusCode, message } = err.response.data;
    if (statusCode === 400) {
      Message.warning({ message });
    } else if ([403,401].indexOf(statusCode) > -1) {
      Message.warning("请先登录");
      // context.redirect("/user/login");
    }
  })
}

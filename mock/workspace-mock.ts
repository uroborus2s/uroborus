import http from "http";

export default {
  'POST /^/api/v1/user/[A-Za-z0-9]+/moveWorkspace$/': (req: http.ClientRequest, res: http.ServerResponse) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write({msg: "SUCCESS", data: null})
    res.end('ok');
  },

  'POST /^/api/v1/application/[A-Za-z0-9]+/updateColor$/': (req: http.ClientRequest, res: http.ServerResponse) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write({msg: "SUCCESS", data: null})
    res.end('ok');
  },

  'GET /api/v1/error': (req: http.ClientRequest, res: http.ServerResponse) => {
    // 添加跨域请求头
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.writeHead(400, {
    //   'Content-Type': 'application/json; charset=utf-8'
    // });
    // res.end(JSON.stringify({msg: "SUCCESS", data: null}));
    // res.end({});
    res.end('ok')
  },
}

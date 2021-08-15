import http from 'http';

export default {
  'GET /api/v1/workspace': {
    'message': 'SUCCESS',
    'code': 1,
    'trace_id': 'brw6Se71uVyClx9Ll',
    'data': {
      'collaborators': {
        'wspNOl2FcrUIXXCeW': [{
          'id': 'usrKOo1I2GLZsDYCS',
          'avatar': 'owner',
          'created_at': '2021-05-06T07:26:26.000Z',
          'nickname': '孙行者',
          'role': 50,
          'updated_at': '2021-05-06T07:26:26.000Z',
          'user_id': 'usrKOo1I2GLZsDYCS',
        }],
        'wspZHpJpXiELtLdCX': [{
          'avatar': 'owner',
          'created_at': '2021-05-06T07:26:26.000Z',
          'id': 'usrKOo1I2GLZsDYCS',
          'nickname': '猪八戒',
          'role': 50,
          'updated_at': '2021-05-06T07:26:26.000Z',
          'user_id': 'usrKOo1I2GLZsDYCS',
        }],
        'wsplxEdAfiIebtra0': [{
          'avatar': 'owner',
          'created_at': '2021-05-06T07:26:26.000Z',
          'id': 'usrKOo1I2GLZsDYCS',
          'nickname': '白龙马',
          'role': 50,
          'updated_at': '2021-05-06T07:26:26.000Z',
          'user_id': 'usrKOo1I2GLZsDYCS',
        }],
      },
      'data': [{
        'id': 'wspNOl2FcrUIXXCeW',
        'name': '工作空间 2',
        'user_role': 0,
        'plan_id': 'plndkpdTaqYvi7YDT',
        'plan_name': '季度套餐B',
        'order': 1,

        'joined_at': '2020-11-24T15:23:18.000Z',
        'created_at': '2020-11-24T15:23:18.000Z',
        'updated_at': '2020-11-24T15:23:18.000Z',

        'shared_only_bases': true,
        'create_able': true,
        'update_able': true,
        'delete_able': true,
        'share_able': true,
        'bases': [],
      }, {
        'id': 'wspZHpJpXiELtLdCX',
        'create_able': true,
        'created_at': '2020-11-24T15:23:18.000Z',
        'delete_able': true,
        'joined_at': '2020-11-24T15:23:18.000Z',
        'name': '新的工作空间',
        'order': 2,
        'plan_id': 'plndkpdTaqYvi7YDT',
        'plan_name': '基础用户',
        'share_able': true,
        'shared_only_bases': true,
        'update_able': true,
        'updated_at': '2020-11-24T15:23:18.000Z',
        'user_role': 0,
        'bases': [
          {
            'id': 'appoSYG4iPXkQArvg',
            'name': 'Untitled Base',
            'order': 0,
            'icon': 'default',
            'color': 'orange',
            'created_at': '2020-11-24T15:23:18.000Z',
            'updated_at': '2020-11-24T15:23:18.000Z',

            'create_able': true,
            'delete_able': true,
            'share_able': true,
            'update_able': true,
            'user_role': 0,
          },
        ],
      }, {
        'id': 'wsplxEdAfiIebtra0',
        'name': '我的个人工作空间',
        'create_able': true,
        'created_at': 'string',
        'delete_able': true,
        'joined_at': '2020-11-24T15:23:18.000Z',
        'order': 3,
        'plan_id': 'plndkpdTaqYvi7YDT',
        'plan_name': '年套餐A用户',
        'share_able': true,
        'shared_only_bases': true,
        'update_able': true,
        'updated_at': '2020-11-24T15:23:18.000Z',
        'user_role': 0,
        'bases': [
          {
            'id': 'appv6HWDHo16QPUOT',
            'name': 'Project tracker4',
            'color': 'teal',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'asterisk',
            'order': 0,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appU9f343eH0xt8TH',
            'name': 'Sales CRM"',
            'color': 'orange',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'money',
            'order': 2,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appLZkf58IuFiXE9n',
            'name': 'Content calendar',
            'color': 'blueLight',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'calendar',
            'order': 3,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appY3JriLt1YeAbJ4',
            'name': 'Product planning',
            'color': 'blueLight',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'bolt',
            'order': 1,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'app9sTEYx9i3nco1t',
            'name': '个人项目管理',
            'color': 'blue',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'suitcase',
            'order': 5,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appZkxb5Xkucg0oDR',
            'name': '家庭账单管理',
            'color': 'purple',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'suitcaseAlt',
            'order': 6,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appsB360TepjfzCF8',
            'name': 'Digital video production',
            'color': 'red',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'ambulance',
            'order': 7,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appbd9mkkx05R2rGP',
            'name': '产品目录管理',
            'color': 'gray',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'book',
            'order': 8,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
          {
            'id': 'appKot2AYYYTe19lF',
            'name': '空白文档',
            'color': 'purple',
            'create_able': true,
            'created_at': '2020-11-24T15:23:18.000Z',
            'delete_able': true,
            'icon': 'default',
            'order': 9,
            'share_able': true,
            'update_able': true,
            'updated_at': '2020-11-24T15:23:18.000Z',
            'user_role': 0,
          },
        ],
      }],

    },
  },
  'POST /api/v1/workspace': (req: http.ClientRequest, res: http.ServerResponse) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.write(JSON.stringify({
      'code': 0,
      'data': {
        'id': 'wspRfklDfiIebrjB4',
      },
      'message': 'SUCCESS',
      'trace_id': 'tyie888830kjdf',
    }));
    res.end();
  },
  'PUT /api/v1/workspace/wsplxEdAfiIebtra0': (req: http.ClientRequest, res: http.ServerResponse) => {
    console.log('mock数据返回');
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.write(JSON.stringify({
      'code': 0,
      'data': {},
      'message': 'SUCCESS',
      'trace_id': 'tyie888830kjdf',
    }));
    res.end();
  },

  'DELETE /api/v1/workspace/wspRfklDfiIebrjB4': (req: http.ClientRequest, res: http.ServerResponse) => {
    console.log('mock数据返回');
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.write(JSON.stringify({
      'code': 0,
      'data': {},
      'message': 'SUCCESS',
      'trace_id': 'tyie888830kjdf',
    }));
    res.end();
  },
};

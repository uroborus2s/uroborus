import http from 'http';

export default {
  'PUT /api/v1/base/appv6HWDHo16QPUOT': (req: http.ClientRequest, res: http.ServerResponse) => {
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
  '/api/v1/base/appv6HWDHo16QPUOT': {
    'code': 0,
    'message': 'SUCCESS',
    'trace_id': 'tyie888830kjdf',
    'data': {
      collaborators: [{
        'avatar': 'owner',
        'created_at': '2020-11-24T15:23:18.000Z',
        'id': 'wspNOl2FcrUIXXCeW',
        'nickname': 'pick 测试',
        'role': 0,
        'updated_at': '2020-11-24T15:23:18.000Z',
        'user_id': 'usrKOo1I2GLZsDYCS',
      }],
      'color': 'teal',
      'create_able': true,
      'created_at': '2020-11-24T15:23:18.000Z',
      'delete_able': true,
      'desc': '',
      'icon': 'asterisk',
      'id': 'appv6HWDHo16QPUOT',
      'joined_at': '2020-11-24T15:23:18.000Z',
      'name': 'Project tracker4',
      'order': 0,
      'share_able': true,
      'update_able': true,
      'updated_at': '2020-11-24T15:23:18.000Z',
      'workspace_id': 'wsplxEdAfiIebtra0',
      'selected_table_id': 'tblU2UMVCSAjDvlrT',
      'tables': [
        {
          'base_id': 'appv6HWDHo16QPUOT',
          'create_able': true,
          'created_at': '2020-11-24T15:23:18.000Z',
          'delete_able': true,
          'desc': '设计',
          'id': 'tblU2UMVCSAjDvlrT',
          'joined_at': '2020-11-24T15:23:18.000Z',
          'name': '设计项目',
          'order': 0,
          'share_able': true,
          'update_able': true,
          'updated_at': '2020-11-24T15:23:18.000Z',
          'collaborator': null,
          'columns':null,
          'relate_rows': null,
          'rows': null,
          'views': null,
        },
      ],
    },
  },
};

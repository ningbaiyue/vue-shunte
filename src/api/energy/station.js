import request from '@/utils/request';

// 查询储能站点信息列表
export function listInfo(query) {
  return request({
    url: '/energy/station/list',
    method: 'get',
    params: query,
  });
}

// 查询储能站点信息详细
export function getInfo(id) {
  return request({
    url: '/energy/station/' + id,
    method: 'get',
  });
}

// 新增储能站点信息
export function addInfo(data) {
  return request({
    url: '/energy/station',
    method: 'post',
    data: data,
  });
}

// 修改储能站点信息
export function updateInfo(data) {
  return request({
    url: '/energy/station',
    method: 'put',
    data: data,
  });
}

// 删除储能站点信息
export function delInfo(id) {
  return request({
    url: '/energy/station/' + id,
    method: 'delete',
  });
}

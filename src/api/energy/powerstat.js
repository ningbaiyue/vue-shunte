import request from '@/utils/request'

// 查询电表统计列表
export function listPowerstat(query) {
  return request({
    url: '/energy/powerstat/list',
    method: 'get',
    params: query
  })
}

// 查询电表统计详细
export function getPowerstat(id) {
  return request({
    url: '/energy/powerstat/' + id,
    method: 'get'
  })
}

// 新增电表统计
export function addPowerstat(data) {
  return request({
    url: '/energy/powerstat',
    method: 'post',
    data: data
  })
}

// 修改电表统计
export function updatePowerstat(data) {
  return request({
    url: '/energy/powerstat',
    method: 'put',
    data: data
  })
}

// 删除电表统计
export function delPowerstat(id) {
  return request({
    url: '/energy/powerstat/' + id,
    method: 'delete'
  })
}

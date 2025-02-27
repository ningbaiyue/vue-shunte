import request from '@/utils/request'

// 查询电池统计列表
export function listBatterystat(query) {
  return request({
    url: '/energy/batterystat/list',
    method: 'get',
    params: query
  })
}

// 查询电池统计详细
export function getBatterystat(id) {
  return request({
    url: '/energy/batterystat/' + id,
    method: 'get'
  })
}

// 新增电池统计
export function addBatterystat(data) {
  return request({
    url: '/energy/batterystat',
    method: 'post',
    data: data
  })
}

// 修改电池统计
export function updateBatterystat(data) {
  return request({
    url: '/energy/batterystat',
    method: 'put',
    data: data
  })
}

// 删除电池统计
export function delBatterystat(id) {
  return request({
    url: '/energy/batterystat/' + id,
    method: 'delete'
  })
}

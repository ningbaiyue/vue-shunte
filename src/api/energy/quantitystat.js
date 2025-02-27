import request from '@/utils/request'

// 查询电量统计列表
export function listQuantitystat(query) {
  return request({
    url: '/energy/quantitystat/list',
    method: 'get',
    params: query
  })
}

// 查询电量统计详细
export function getQuantitystat(id) {
  return request({
    url: '/energy/quantitystat/' + id,
    method: 'get'
  })
}

// 新增电量统计
export function addQuantitystat(data) {
  return request({
    url: '/energy/quantitystat',
    method: 'post',
    data: data
  })
}

// 修改电量统计
export function updateQuantitystat(data) {
  return request({
    url: '/energy/quantitystat',
    method: 'put',
    data: data
  })
}

// 删除电量统计
export function delQuantitystat(id) {
  return request({
    url: '/energy/quantitystat/' + id,
    method: 'delete'
  })
}

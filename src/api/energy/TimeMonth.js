import request from '@/utils/request'

// 查询月时段配置列表
export function listTimeMonth(query) {
  return request({
    url: '/energy/TimeMonth/list',
    method: 'get',
    params: query
  })
}

// 查询月时段配置详细
export function getTimeMonth(id) {
  return request({
    url: '/energy/TimeMonth/' + id,
    method: 'get'
  })
}

// 新增月时段配置
export function addTimeMonth(data) {
  return request({
    url: '/energy/TimeMonth',
    method: 'post',
    data: data
  })
}

// 修改月时段配置
export function updateTimeMonth(data) {
  return request({
    url: '/energy/TimeMonth',
    method: 'put',
    data: data
  })
}

// 删除月时段配置
export function delTimeMonth(id) {
  return request({
    url: '/energy/TimeMonth/' + id,
    method: 'delete'
  })
}

import request from '@/utils/request'

// 查询收益统计列表
export function listIncomestat(query) {
  return request({
    url: '/energy/incomestat/list',
    method: 'get',
    params: query
  })
}

// 查询收益统计详细
export function getIncomestat(id) {
  return request({
    url: '/energy/incomestat/' + id,
    method: 'get'
  })
}

// 新增收益统计
export function addIncomestat(data) {
  return request({
    url: '/energy/incomestat',
    method: 'post',
    data: data
  })
}

// 修改收益统计
export function updateIncomestat(data) {
  return request({
    url: '/energy/incomestat',
    method: 'put',
    data: data
  })
}

// 删除收益统计
export function delIncomestat(id) {
  return request({
    url: '/energy/incomestat/' + id,
    method: 'delete'
  })
}

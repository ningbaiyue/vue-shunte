import request from '@/utils/request'

// 查询时段模板列表
export function listTimeTemp(query) {
  return request({
    url: '/energy/front/timetemplist',
    method: 'get',
    params: query
  })
}

// 查询时段模板详细
export function getTimeTemp(id) {
  return request({
    url: '/energy/front/timetempInfo/' + id,
    method: 'get'
  })
}

// 新增时段模板
export function addTimeTemp(data) {
  return request({
    url: '/energy/front/timetemp',
    method: 'post',
    data: data
  })
}

// 修改时段模板
export function updateTimeTemp(data) {
  return request({
    url: '/energy/front/timetemp',
    method: 'post',
    data: data
  })
}

// 删除时段模板
export function delTimeTemp(ids) {
  return request({
    url: '/energy/front/timetemp/' + ids,
    method: 'delete'
  })
}

// 设置表格序号
function setNum (arr, pageNum, pageSize) {
    let number = (pageNum - 1) * pageSize
    for (let item of arr) {
        let index = ++number
        item.num = index < 10 ? '0' + index : index
    }
    return arr
}

// 遍历菜单数组，组成树形
function makeMenuTree (list) {
    let arr = []
    list.forEach(element => {
        if (element.type === 0) {
            element.children = []
            arr.push(element)
        }
    })
    arr.forEach(element => {
        element.children = list.filter(e => {
            return e.parentId === element.menuId
        })
    })
    arr.forEach(element => {
        element.children.forEach(k => {
            k.children = list.filter(e => {
                return e.parentId === k.menuId
            })
        })
    })
    return arr
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
function treeDataTranslate (data, id = 'id', pid = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

export {
    setNum,
    makeMenuTree,
    treeDataTranslate
}

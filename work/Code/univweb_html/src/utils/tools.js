// 添加序号
export function setNum (arr, pageNum, pageSize) {
    let number = (pageNum - 1) * pageSize
    for (let item of arr) {
        let index = ++number
        item.num = index < 10 ? '0' + index : index
    }
    return arr
}

const ExcelJs = require('exceljs')

// const workbook = new ExcelJs.Workbook()
// workbook.xlsx.readFile('C:/Users/AunAbbas/Downloads/ExcelDownloadTest.xlsx').then(function () {
//     const worksheet = workbook.getWorksheet('Sheet1')
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, colNumber) => {
//             console.log(cell.value)
//         })
//     })
// })
async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const output = await readExcel(worksheet, searchText)
    const cell = worksheet.getCell(output.row + change.rowChange, output.col + change.colChange)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {
    let output = {row:-1, col:-1}
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber
                output.col = colNumber
            }
        })
    })
    return output
}

writeExcelTest('Mango', 500,  {rowChange: 0, colChange: 2}, 'C:/Users/AunAbbas/Downloads/ExcelDownloadTest.xlsx')
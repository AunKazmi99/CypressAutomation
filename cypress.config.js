const { defineConfig } = require("cypress")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify")
const sqlServer = require('cypress-sql-server')
const excelToJson = require("convert-excel-to-json")
const fs = require('fs')
const ExcelJs = require('exceljs')

async function setupNodeEvents(on, config) {
  require('cypress-mochawesome-reporter/plugin')(on)
  await preprocessor.addCucumberPreprocessorPlugin(on, config)
  on("file:preprocessor", browserify.default(config))

  config.db = {
    userName: "",
    password: "",
    server: "",
    options: {
      database: "",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }

  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      })
      return result
    }
  })

  on('task', {
    async writeExcelTest({searchText, replaceText, change, filePath}) {
      const workbook = new ExcelJs.Workbook()
      await workbook.xlsx.readFile(filePath)
      const worksheet = workbook.getWorksheet('Sheet1')
      const output = await readExcel(worksheet, searchText)
      const cell = worksheet.getCell(output.row + change.rowChange, output.col + change.colChange)
      cell.value = replaceText
      return workbook.xlsx.writeFile(filePath).then(function() {
        return true
      }).catch((error) => {
        return false
      })
  }
  })
  return config
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

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  reporter: 'cypress-mochawesome-reporter',
  projectId: "d864o8",
  retries: {
    runMode: 1,
  },
  env: {
    url: "https://rahulshettyacademy.com/"
  },
  e2e: {
    setupNodeEvents,
    specPattern: [
      'cypress/integration/examples/*.js',
      'cypress/integration/BDD/*.feature'
    ]
  },
});

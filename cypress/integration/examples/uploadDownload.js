describe('Upload Download Test', () => {
    it('My First Test Case', () => {
        const excelPath = Cypress.config('fileServerFolder') + '/cypress/downloads/download.xlsx'
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html')
        cy.get('#downloadButton').click()
        cy.task('writeExcelTest', {searchText: 'Apple', replaceText: 350, change: {rowChange: 0, colChange: 2}, filePath: excelPath})
        cy.get('#fileinput').selectFile(excelPath)    
        cy.get("[role='row'] [role='cell']:nth-child(2)").each(($el, index, $list) => {
            if($el.text() === 'Apple') {
                expect(Number($el.next().next().text())).to.eq(350)
            }
        })
        cy.contains('Apple').parent().parent().find('#cell-4-undefined').should('have.text', '350')
    })
})
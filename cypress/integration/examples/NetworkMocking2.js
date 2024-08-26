describe('Network Mocking2', function() {
    it('My First Test Case', function() {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=aun' 
            req.continue((res) => {
                // expect(res.statusCode).to.equal(403)
            })
        }).as('dummyUrl')
        cy.get('.btn-primary').click()
        cy.wait('@dummyUrl')
    })
})
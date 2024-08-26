describe('Network Mocking', function() {
    it('My First Test Case', function() {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
            }]
        }).as('bookRetrievals')
        cy.get('.btn-primary').click()
        cy.wait('@bookRetrievals').then((interception) => {
            cy.get('tr').should('have.length', interception.response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })
})
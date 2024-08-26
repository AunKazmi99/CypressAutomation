const neatCSV = require('neat-csv')

let productName

describe('Auto Login', function() {
    it('My First Test Case', function() {
        cy.LoginAPI().then(function() {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
            cy.get('.card-body b').eq(1).then(function(element) {
                productName = element.text()
            })
            cy.get('.card-body button:last-child').eq(1).click()
            cy.get('[routerlink*="cart"]').click()
            cy.get('div.subtotal button').click()
            cy.get('[placeholder$="Select Country"]').type('Pakistan')
            cy.get('.ta-results').click()
            cy.get('a.btnn.action__submit.ng-star-inserted').click()
            cy.wait(2000)
            cy.contains('Click To Download Order Details in CSV').click()
            cy.readFile(Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_aun.csv').then(async function(text) {
                const csv = await neatCSV(text)
                const actualProductCSV = csv[0]["Product Name"]
                expect(productName).to.equal(actualProductCSV) 
            })

        })
    })
})
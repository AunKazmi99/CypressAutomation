describe('My Second Test Suite', function() {
    it('My Second Test Case', function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.get('.search-button')
        cy.wait(2000)
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const vegetableName = $el.find('h4.product-name').text()
            if(vegetableName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
        cy.get('.cart-icon > img').click()
        cy.get('.cart-items').find('.cart-item').each(($el, index, $list) => {
            cy.log($el.find('.product-name').text())
        })
        cy.get('.cart-preview > .action-block > button').click()
        cy.get('button').contains('Place Order').click()
    })
})
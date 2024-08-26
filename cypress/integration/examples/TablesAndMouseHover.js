describe('My Sixth Test Suite', function() {
    it('My First Test Case', function() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice')

        //Tables
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            if($el.text().includes('Master Selenium Automation in simple Python Language')) {
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        })

        //Mouse Hover
        //cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')
    })
})
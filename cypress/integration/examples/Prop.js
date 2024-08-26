describe('My Seventh Test Suite', function() {
    it('My First Test Case', function() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice')
        cy.get('#opentab').then(function(el) {
            const url = el.prop('href')
            cy.visit(url)
            cy.origin('https://www.qaclickacademy.com', () => {
                cy.get('div.sub-menu-bar a[href*="about"]').click()     
            })
        })
    })
})
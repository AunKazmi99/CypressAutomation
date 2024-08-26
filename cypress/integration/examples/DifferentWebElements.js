describe('My Third Test Suite', function() {
    it('My First Test Case', function() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice')

        //checkboxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])

        //Static Dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        //Dynamic Dropdown
        cy.get('#autocomplete').type('Pa')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text().includes('Pakistan')) {
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value', 'Pakistan')

        //Radio Buttons
        cy.get('input[value="radio2"]').check().should('be.checked')
        cy.get('input[value="radio3"]').check().should('be.checked')
        cy.get('input[value="radio2"]').should('not.be.checked')


        //Visibility & Invisibility
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').scrollIntoView().click()
        //cy.get('#hide-textbox').click({force: true})
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').scrollIntoView().click()
        //cy.get('#show-textbox').click({force: true})
        cy.get('#displayed-text').should('be.visible')
    })
})
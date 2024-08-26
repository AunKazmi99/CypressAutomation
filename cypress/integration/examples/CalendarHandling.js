describe('My Ninth Test Suite', function() {
    it('Calendar Test Case', function() {
        const date = '2'
        const monthNumber = '3'
        const year = '1999'
        const expectedList = [monthNumber, date, year]

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('a[href*="offers"]').invoke('removeAttr', 'target').click()
        cy.get('.react-date-picker__inputGroup').click()
        cy.get("button[class='react-calendar__navigation__label']").click()
        cy.get("button[class='react-calendar__navigation__label']").click()
        cy.get("button[class='react-calendar__navigation__arrow react-calendar__navigation__prev-button']").click()
        cy.get("button[class='react-calendar__navigation__arrow react-calendar__navigation__prev-button']").click()
        cy.get("button[class='react-calendar__navigation__arrow react-calendar__navigation__prev-button']").click()
        cy.contains("button", year).click()
        cy.wait(100)
        cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber) - 1).click()
        cy.wait(100)
        cy.contains("abbr", date).click()
        cy.wait(100)
        cy.get('.react-date-picker__inputGroup__input').each(($el, index, $list) => {
            cy.wrap($el).invoke('val').then(function(text) {
                cy.log(text)
            })
        })
        cy.get('.react-date-picker__inputGroup__input').each(($el, index, $list) => {
            cy.wrap($el).invoke('val').should('eq', expectedList[index])
        })
        cy.get("input[type='date']").should('have.value', '1999-03-02')
    })
})
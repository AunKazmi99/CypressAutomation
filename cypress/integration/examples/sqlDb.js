describe('Window', () => {
    it('Database Connection', () => {
        cy.sqlServer("SELECT * FROM Persons").then(function(result) {
            console.log(result[0][1])
        })
    })
})
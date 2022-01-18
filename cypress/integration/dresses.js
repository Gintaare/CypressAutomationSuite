describe('Make sure that Dresses elements work', () => {
    it('Opens Dresses', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.get('[class="sf-with-ul"]').eq(3).click();
        cy.title().should('include', 'Dresses - My Store')

    });
    //TODO: SITAS FAILAS NEJASNAS KA CIA TESTAVAU IR NZN AR TURI PRASMES
    it('Opens "Casual Dresses" section', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Casual Dresses").click({ force: true });
        cy.title().should('include', 'Casual Dresses - My Store')

    });

    it('Opens "Evening Dresses" section', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Evening Dresses").click({ force: true });
        cy.title().should('include', 'Evening Dresses - My Store')

    });

    it('Opens "Summer Dresses" section', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Summer Dresses").click({ force: true });
        cy.title().should('include', 'Summer Dresses - My Store')
    });
//TODO: Sitas neveikia 
    it('Header Text is correct', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.get(".cat-name").then(($headerText) => {
            const headerText = $headerText.text()
            expect(headerText).is.eq("Dresses ")
        })


    });



});

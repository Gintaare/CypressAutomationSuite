describe('Make sure that Dresses elements work', () => {
    it('Opens Dresses', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.get('[class="sf-with-ul"]').eq(3).click();
        cy.title().should('include', 'Dresses - My Store')
    
    });

    it('Opens "Casual Dresses" section', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Casual Dresses").click({force: true});
        cy.title().should('include', 'Casual Dresses - My Store')

    }); 

    it('Opens "Evening Dresses" section', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Evening Dresses").click({force: true});
        cy.title().should('include', 'Evening Dresses - My Store')

    }); 

    it('Opens "Summer Dresses" section', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Evening Dresses").click({force: true});
        cy.title().should('include', 'Summer Dresses - My Store')
    }); 

    it.only('Header Text is correct', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.get(".cat-name").then(($headerText) => {
            const headerText = $headerText.text()
            expect(headerText).is.eq("Dresses ")
     })
       }); 


       

});
  
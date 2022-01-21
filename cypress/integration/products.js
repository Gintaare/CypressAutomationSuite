describe('Make sure that Dresses elements work', () => {

    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
    })

    it('Opens Dresses', () => {
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.get('[class="sf-with-ul"]').eq(3).click();
        cy.title().should('include', 'Dresses - My Store')

    });

    it('Opens "Casual Dresses" section', () => {
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Casual Dresses").click({ force: true });
        cy.title().should('include', 'Casual Dresses - My Store')

    });

    it('Opens "Evening Dresses" section', () => {
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Evening Dresses").click({ force: true });
        cy.title().should('include', 'Evening Dresses - My Store')

    });

    it('Opens "Summer Dresses" section', () => {
        cy.get('a[title="Dresses"]').eq(1).click();
        cy.contains("Summer Dresses").click({ force: true });
        cy.title().should('include', 'Summer Dresses - My Store')
    });


    describe('Apply Lowest to Highest Order By', () => {
        it.only('Should see the prices in ascending order', () => {
            cy.get('a[title="Women"]').click();
            cy.get('#selectProductSort').select('Price: Lowest first');

            var prices = new Array()
            var pricesElements = cy.get('.price.product-price', { timeout: 30000 });

            pricesElements.each(elem => {
                var text = elem.text().replace("$", "")
                var num = parseFloat(text)
                prices.push(num);
            }).then(obj => {

                var prices_sort = Array.from(prices)
                prices_sort = prices_sort.sort((a, b) => a - b)

                for (let i = 0; i < prices.length; i++) {
                    expect(prices[i]).to.be.eq(prices_sort[i])
                }
            });
        });
    });



});

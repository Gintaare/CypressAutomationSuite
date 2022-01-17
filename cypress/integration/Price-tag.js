describe('Show the list of prices', () => {
    it.only('The List of Prices', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('.content_price').find('.price.product-price').invoke('text').as('itemPrice');
        cy.get('@itemPrice').then($linkText => {
            var itemPrice = $linkText.split('$');
            var i;
            for(i = 0; i < itemPrice.length; i++) {
                cy.log(itemPrice[i])
            }
        })

    });
});
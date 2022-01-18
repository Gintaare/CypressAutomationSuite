describe('Test Add Product to Cart', () => {

    // Keep user session
    afterEach(() => {
        let str = [];
        cy.getCookies().then((cook) => {
            cy.log(cook);
            for (let l = 0; l < cook.length; l++) {
                if (cook.length > 0 && l == 0) {
                    str[l] = cook[l].name;
                    Cypress.Cookies.preserveOnce(str[l]);
                } else if (cook.length > 1 && l > 1) {
                    str[l] = cook[l].name;
                    Cypress.Cookies.preserveOnce(str[l]);
                }
            }
        })
    })

    it("Should be able to sign in", () => {
        cy.visit(Cypress.config().baseUrl + "index.php");

        cy.get(".login").click()
        cy.get("#email").type(Cypress.config().username)
        cy.get("#passwd").type(Cypress.config().password)
        cy.get("#SubmitLogin").click()
        cy.get(".account").invoke('text').should('eq', 'Andrey Ivanovich')
    })

    it("Add specific product to basket", () => {
        cy.visit(Cypress.config().baseUrl + "index.php");
        cy.get(".product-name").contains("Faded Short Sleeve T-shirts").click({ force: true });
                cy.get('#add_to_cart').click()
                cy.get("a[title='Proceed to checkout']").click()
                cy.get("#cart_title").should('contain', 'Shopping-cart summary')
    });

    //TODO: nepasispaudzia du kartus add
    it("Increase the quantity of the item", () => {
        cy.visit(Cypress.config().baseUrl + "index.php?id_product=1&controller=product")
        cy.get("#add_to_cart").click()
        cy.get("a[title='Proceed to checkout']").click()
        for (let n = 3; n < 3; n++) {
            cy.get("a[title='Add']").click()
        }
        cy.get("input[name='quantity_1_1_0_0_hidden']").invoke('val').should('eq', 3)
    });

    it("Add multiple items of different types and verify.", () => {
        cy.visit(Cypress.config().baseUrl + "index.php?id_category=8&controller=category")
        cy.get(".right-block").eq(1).click()
        cy.get("#add_to_cart").click()
        cy.get("[title='Continue shopping']").click()
        cy.go('back')
        cy.get(".right-block").eq(2).click()
        cy.get("#add_to_cart").click()
        cy.get("[title='Continue shopping']").click()
        cy.go('back')
        cy.get(".right-block").eq(3).click()
        cy.get("#add_to_cart").click()
        cy.get("[title='Proceed to checkout']").click()
        cy.get(".cart_product").should('have.length', 4)

    })

    //TODO: dingsta visos prekes, nors istrinu tik viena
    it("Remove some items from the cart and verify.", () => {
        cy.get(".cart_quantity_delete").eq(0).click()
        cy.get(".cart_product").should('have.length', 3)
    })

    it("User is redirected to the checkout page after clicking on the checkout button.", () => {
        cy.get("a[@title='Proceed to checkout']").click()
        cy.get('#form-control').should.exist
        cy.get('#address_delivery').should.exist
        cy.get('#address_invoice').should.exist
        cy.get('#id_address_delivery').should.exist

    })
    it("User is able to add products to the wishlist.", () => {
        cy.visit(Cypress.config().baseUrl + "index.php?id_category=8&controller=category")
        cy.get(".right-block").eq(1).click()
        cy.get("#wishlist_button").click()
        cy.get("a[title='Close']").click()
        cy.go('back')
        cy.get(".right-block").eq(2).click()
        cy.get("#wishlist_button").click()
        cy.get("a[title='Close']").click()
        cy.visit(Cypress.config().baseUrl + 'index.php?fc=module&module=blockwishlist&controller=mywishlist')
        cy.get(".align_center").invoke('text').should('eq', 2)
    })
});

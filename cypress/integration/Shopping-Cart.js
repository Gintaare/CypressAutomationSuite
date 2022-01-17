describe('Test Add Product to Cart', () => {
  

    it.only("Should be able to sign in", () => {
        cy.visit("http://automationpractice.com/index.php");
        cy.get(".login").click()
        cy.get("#email").type('andrey@gmail.com')
        cy.get("#passwd").type('Asdfw80')
        cy.get("#SubmitLogin").click()
        cy.get(".account").invoke('text').should('eq', 'Andrey Ivanovich')
    })
  //Wrap komanda executinima antra kart gale
    it.skip("Add specific product to basket", () => {
        cy.go('back')
        cy.visit("http://automationpractice.com/index.php");
        cy.get(".product-name").each(($el, index, $list) => {
            if ($el.text().includes('Faded Short Sleeve T-shirts')) {
                cy.wrap($el).click()
                cy.get('#add_to_cart').click()
                cy.get("a[title='Proceed to checkout']").click()
            }
            cy.get("#cart_title").should('contain', 'Shopping-cart summary')
        });
    });
    //nepasispaudzia du kartus add
    it.skip("Increase the quantity of the item", () => {
        cy.visit("http://automationpractice.com/index.php?id_product=1&controller=product")
        cy.get("#add_to_cart").click()
        cy.get("a[title='Proceed to checkout']").click()
        for (let n = 3; n < 3; n++) {
            cy.get("a[title='Add']").click()
        }
        cy.get("input[name='quantity_1_1_0_0_hidden']").invoke('val').should('eq', 3)
    });

    it("Add multiple items of different types and verify.", () => {
        cy.visit("http://automationpractice.com/index.php?id_category=8&controller=category")
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

    //dingsta visos prekes, nors istrinu tik viena
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
        cy.visit("http://automationpractice.com/index.php?id_category=8&controller=category")
        cy.get(".right-block").eq(1).click()
        cy.get("#wishlist_button").click()
        cy.get("a[title='Close']").click()
        cy.go('back')
        cy.get(".right-block").eq(2).click()
        cy.get("#wishlist_button").click()
        cy.get("a[title='Close']").click()
        cy.visit('http://automationpractice.com/index.php?fc=module&module=blockwishlist&controller=mywishlist')
        cy.get(".align_center").invoke('text').should('eq', 2)

    })
});

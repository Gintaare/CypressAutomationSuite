describe('Test Contact Us form', () => {

    it('Should be able to open contact form', () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.get('#contact-link > a').click();

    });

    beforeEach(() => {
        cy.visit("http://automationpractice.com/index.php?controller=contact")
    })


    it.only("Fields and labels should exist", () => {
        cy.get('#id_contact').should.exist
        cy.get('#email').should.exist
        cy.get('#message').should.exist
        cy.get('#id_order').should.exist
    });

    it('Should be able to submit a submission via contact form', () => {
        cy.get('#id_contact').select('Webmaster');
        cy.get("#email").type("andrey1@gmail.com");
        cy.get("#message").type("Hello, can you help me?");
        cy.get("#id_order").type("978546");
        cy.get("#submitMessage").click();
        cy.get("#center_column").should('contain', 'Your message has been successfully sent to our team.')
    });


    it('Empty Email Field should show an error', () => {
        cy.get("#submitMessage").click();
        cy.get("#center_column").should('contain', 'Invalid email address.')
    });

    it('Email requires valid email address - no @', () => {
        cy.get("#email").type("andreygmail.com")
        cy.get("#submitMessage").click();
        cy.get("#center_column").should('contain', 'Invalid email address.')
    });

    it('Email requires valid email address - no .com', () => {
        cy.get("#email").type("andrey@gmail")
        cy.get("#submitMessage").click();
        cy.get("#center_column").should('contain', 'Invalid email address.')
    });

});




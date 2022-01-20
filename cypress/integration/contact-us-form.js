describe('Contact Us form', () => {

    it('Should be able to open contact form', () => {
        cy.visit(Cypress.config().baseUrl + 'index.php');
        cy.get('#contact-link > a').click();
    });

    context('Form should work', () => {
        beforeEach(() => {
            cy.visit(Cypress.config().baseUrl + "index.php?controller=contact")
        })

        it("Fields and labels should exist", () => {
            cy.get('#id_contact').should.exist
            cy.get('#email').should.exist
            cy.get('#message').should.exist
            cy.get('#id_order').should.exist
        });

        it('Should be able to submit a submission via contact form', () => {
            cy.get('#id_contact').select('Webmaster');
            cy.fixture('contact').then(c => {
                cy.get("#email").type(c.email);
                cy.get("#message").type(c.message);
                cy.get("#id_order").type(c.order_id);
                cy.get('input[type="file"]#fileUpload').attachFile({
                    fileContent: "123123123",
                    fileName: 'testPicture.png',
                    mimeType: 'image/png'
                });

                cy.get("#submitMessage").click();
            })

            // Assert
            cy.get("#center_column").should('contain', 'Your message has been successfully sent to our team.')
        });

        it('Empty Email Field should show an error', () => {
            cy.get("#submitMessage").click();

            // Assert
            cy.get("#center_column").should('contain', 'Invalid email address.')
        });

        it('Email requires valid email address - no @', () => {
            cy.get("#email").type("andreygmail.com")
            cy.get("#submitMessage").click();

            // Assert
            cy.get("#center_column").should('contain', 'Invalid email address.')
        });

        it('Email requires valid email address - no TLD', () => {
            cy.get("#email").type("andrey@gmail")
            cy.get("#submitMessage").click();

            // Assert
            cy.get("#center_column").should('contain', 'Invalid email address.')
        });
    })
});



